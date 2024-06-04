'use server';

import { saveMeal } from './meals';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };
  // console.log('meal: ', meal);

  if (!meal.title || meal.title.trim() === '') {
    return {
      message: 'Invalid input',
    };
  }

  await saveMeal(meal);

  revalidatePath('/meals');

  redirect('/meals');
}

export async function logMessage(message) {
  console.log('message: ', message);
}
