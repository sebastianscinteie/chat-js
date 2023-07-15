'use client'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
let socket
export default function Chat() {
  const [messages, setMessages] = useState([])
  const [userName, setUserName] = useState('')
  useEffect(() => {asyncHandler()}, [])
  async function asyncHandler() {
    const user = window.localStorage.getItem('username') ?? '';
    setUserName(user);

    console.log("Connecting to WebSocket server...");
    const newSocket = io("ws://localhost:42000", {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
      newSocket.send('test')
    });

    newSocket.on("message", (newMessage) => {
      console.log("Received message:", newMessage);
    });

    // Clean up the socket connection on unmount
    return () => {
      console.log("Disconnecting from WebSocket server...");
      newSocket.disconnect();
    };
  }

  function handleChat(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      let newMessages = messages.slice()
      let date = new Date();
      let time = `${date.getHours()}:${date.getMinutes()}`
      newMessages.push({time: time, user: userName, message: e.target.value});
      
      setMessages(newMessages)
      e.target.value = ''
    }
  }

  function handleUser(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.target.value ? ((v) => {
        setUserName(v)
        window.localStorage.setItem('username', v)
      })(e.target.value) : null
      e.target.value = ''
    }
  }

  function getPrettyTime(time) {
    return <span className='font-light text-sm'>{time}</span>
  }

  return (
    <main className="flex flex-col ml-10 mt-10 w-1/2">
      <h1 className="m-4 text-gray-600 text-4xl font-extrabold">Welcome <span className='text-purple-600'>{userName}</span> to the chat.</h1>
      <div className="mt-5 p-2 w-auto h-screen">
      <input className='border rounded border-stone-900 mb-2' placeholder='Change Username' onKeyDown={handleUser}></input>
        <ul className='border rounded border-stone-900 bg-slate-200 mb-2 p-2 h-5/6'>
         {messages.map((x,index) => <li key={index}>{getPrettyTime(x.time)} <b className='text-purple-600'>{x.user}:</b> {x.message}</li>)}
        </ul>
        <input className='border rounded border-stone-900 w-full' onKeyDown={handleChat}></input>
      </div>   
    </main>
  )
}
