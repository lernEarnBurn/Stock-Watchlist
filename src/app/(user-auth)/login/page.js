'use client'

import { motion } from 'framer-motion'
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Login(){
  const router = useRouter()

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
  };

  async function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      console.log(response.data)
      if (response.ok) {
        router.push('/dashboard')
      }
    }catch(err){
      consol.log(err)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center h-[80vh]">
        <input type="text" name="username" placeholder="username"/>
        <input type="password" name="password" placeholder="password"/>
        <motion.button
          type='submit'
          className="mt-2 button"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="rest"
          initial="rest"
         >Submit
        </motion.button>
        <Link className='self-end underline text-sm' href="/signup">Create Account</Link>
      </form>
    </>
  )
}