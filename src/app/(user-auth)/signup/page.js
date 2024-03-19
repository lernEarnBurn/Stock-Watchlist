'use client'

import { motion } from 'framer-motion'
import Link from 'next/link';


export default function Signup(){
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
  };

  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center h-[80vh]">
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>
        <motion.button
          className="mt-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="rest"
          initial="rest"
         >Submit
        </motion.button>
        <Link className='self-end underline text-sm' href="/login">Already Have Account</Link>

      </div>
    </>
  )
}