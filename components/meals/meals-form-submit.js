import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
  const status = useFormStatus();
  // console.log('status: ', status);
  const { pending } = status;

  return <button disabled={pending}>{pending ? 'Submitting...' : 'Share Meal'}</button>;
}
