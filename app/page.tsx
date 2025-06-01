import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/marketing/home');
  return null;
}
