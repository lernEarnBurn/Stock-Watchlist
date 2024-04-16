'use client';

import { LogOut, Loader2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function LogoutBtn() {
  const router = useRouter();

  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setLoading(false)
      router.push('/login');
    } else {
      console.log('logout failed');
    }
  }
  return (
    <>
    {!loading ? (
        <button className="logout-button" onClick={handleLogout}>
          <LogOut/>
        </button>
      ) : (
        <button disabled className="logout-button">
          <Loader2 className="animate-spin"/>
        </button>
      )
    }
    </>
  )
}