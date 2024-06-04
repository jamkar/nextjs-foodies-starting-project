import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import * as fs from 'fs';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error('failed to fetch meals');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  const imageName = meal.image.name.split('.')[0];
  const extension = meal.image.name.split('.')[1];

  meal.slug = slugify(`${imageName}-${Math.random()}.${extension}`, { lower: true });
  meal.instructions = xss(meal.instructions);

  const fileName = meal.slug;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `
  ).run(meal);
}
