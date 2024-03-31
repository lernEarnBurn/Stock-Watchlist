import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function POST(request) {
  const session = await getIronSession(cookies(), {
    password: process.env.COOKIE_PASSWORD,
    cookieName: 'user',
  });

  await session.destroy();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}