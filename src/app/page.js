'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  
  //may need to not use localStorage if using server components
  useEffect(() => {
    if (localStorage.getItem('user')) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, []);

  return null; 
}