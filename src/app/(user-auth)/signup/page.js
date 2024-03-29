'use client'

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'
import Link from 'next/link';


export default function Signup(){
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
  };

  const router = useRouter()


  async function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      router.push('/dashboard');
    } else {
      const errorData = await response.json();
      console.log('Error:', errorData.error);
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center h-[80vh]">
        <input name="username" type="text" placeholder="username"/>
        <input name="password" type="password" placeholder="password"/>
        <motion.button
          className="mt-2 button"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="rest"
          initial="rest"
          type='submit'
         >Submit
        </motion.button>
        <Link className='self-end underline text-sm' href="/login">Already Have Account</Link>

      </form>
    </>
  )
}