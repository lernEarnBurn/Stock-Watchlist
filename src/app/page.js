import { redirect } from 'next/navigation';
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers';




export default async function Page() {

  const session = await getIronSession(cookies(), { password: process.env.COOKIE_PASSWORD, cookieName: 'user' });
  if(session.username){
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}