import { signIn } from '@/utils/auth';
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const user = await signIn({ username, password });

    //session management 
    const session = await getIronSession(cookies(), { password: process.env.COOKIE_PASSWORD, cookieName: 'user' });
    session.username = username;
    await session.save();

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
    });
  }
}