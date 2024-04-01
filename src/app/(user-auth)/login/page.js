'use client'

import { motion } from 'framer-motion'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Loader2 } from 'lucide-react'



export default function Login(){
  const router = useRouter()

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
  };

  const [incorrectAttempt, setIncorrectAttempt] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
    try {
      setLoading(true)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        router.push('/dashboard')
      }else{
        setIncorrectAttempt(true)
      }

      setLoading(false)
    }catch(err){
      consol.log(err)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center h-[80vh]">
        <input type="text" name="username" placeholder="username"/>
        <input type="password" name="password" placeholder="password"/>
        {incorrectAttempt && (
          <p className='text-red-400 text-sm ml-1 my-[-2vh] font-semibold self-start'>Username or Password is incorrect.</p>
        )}
        {!loading ? (
            <motion.button
              type='submit'
              className="mt-2 button"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="rest"
              initial="rest"
             >Submit
            </motion.button>
          ) : (
            <button disabled className='mt-2 button place-items-center grid'><Loader2 className='animate-spin'/></button>
          )}
        <Link className='self-end underline text-sm' href="/signup">Create Account</Link>
      </form>
    </>
  )
}