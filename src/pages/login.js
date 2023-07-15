'use client'

import { useState } from 'react'

let userName;

export default function Login() {
  return (
    <main className="flex flex-col ml-10 mt-10 w-1/2">
      <input className='border-black rounded' placeholder='Enter username'></input>
    </main>
  )
}
