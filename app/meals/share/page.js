'use client';

import ImagePicker from '@/components/meals/image-picker';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import { shareMeal } from '@/lib/actions';
import classes from './page.module.css';
import { useFormState } from 'react-dom';

export default function ShareMealPage() {
  // logMessage('Hello me');

  const [state, formAction] = useFormState(shareMeal, {
    massage: null,
  });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor='name'>Your name</label>
              <input type='text' id='name' name='name' required defaultValue='Max' />
            </p>
            <p>
              <label htmlFor='email'>Your email</label>
              <input type='email' id='email' name='email' required defaultValue='aa@aa.cc' />
            </p>
          </div>
          <p>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' required defaultValue='title' />
          </p>
          <p>
            <label htmlFor='summary'>Short Summary</label>
            <input type='text' id='summary' name='summary' required defaultValue='summary' />
          </p>
          <p>
            <label htmlFor='instructions'>Instructions</label>
            <textarea id='instructions' name='instructions' rows='10' required defaultValue='Some instructions'></textarea>
          </p>
          {state.message && <p>{state.message}</p>}
          <ImagePicker label='imageLabel' name='image' />
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
