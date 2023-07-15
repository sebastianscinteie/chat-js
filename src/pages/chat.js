'use client'

import Image from 'next/image'
import { useState } from 'react'

let userName;

export default function Chat() {
  const [messages, setMessages] = useState([])

  function handleEnter(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      let newMessages = messages.slice()
      let date = new Date();
      let time = `${date.getHours()}:${date.getMinutes()}`
      newMessages.push(`${time}  ${e.target.value}`);
      
      setMessages(newMessages)
      e.target.value = ''
    }
  }
  

  return (
    <main className="flex flex-col ml-10 mt-10 w-1/2">
      <h1 className="m-4 text-blue-800 text-4xl font-extrabold">Welcome to the chat.</h1>
      <div className="mt-5 p-2 w-auto h-screen">
        <ul className='border rounded border-stone-900 bg-slate-200 mb-2 p-2 h-5/6'>
         {messages.map((m,index) => <li key={index}>{m}</li>)}
        </ul>
        <input className='border rounded border-stone-900 w-full' onKeyDown={handleEnter}></input>
      </div>   
    </main>
  )
}
