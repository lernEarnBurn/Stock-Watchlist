'use client';

import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();

  async function handleLogout() {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      router.push('/login');
    } else {
      console.log('logout failed');
    }
  }

  return (
    <button className="button" onClick={handleLogout}>
      Logout
    </button>
  );
}