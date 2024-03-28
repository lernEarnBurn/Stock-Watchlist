'use client'

import { motion } from 'framer-motion'
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';


export default function Signup(){
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
  };

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  async function sendSignup(){
    if(username !== '' && password !== ''){
      try{
        const response = await axios.post('api/auth/signup', {username, password})
        console.log(response.data)
        setUsername('')
        setPassword('')
      } catch(err){
        console.log(err)
      }
    }
  }



  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center h-[80vh]">
        <input onChange={handleUsernameChange} type="text" placeholder="username"/>
        <input onChange={handlePasswordChange} type="password" placeholder="password"/>
        <motion.button
          className="mt-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="rest"
          initial="rest"
          onClick={sendSignup}
         >Submit
        </motion.button>
        <Link className='self-end underline text-sm' href="/login">Already Have Account</Link>

      </div>
    </>
  )
}