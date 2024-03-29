import { signIn } from '@/utils/auth';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const user = await signIn({ username, password });

    // Create a session or token for the authenticated user
    // For example, using Iron Session or JWT

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
    });
  }
}