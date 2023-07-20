'use client'

import { useEffect, useState } from 'react'

let socket;

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(makeid(8));

    fetch("http://localhost:42000/socket", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "localhost:42000"
      },
    }).then(() =>{
      socket = new WebSocket("ws://localhost:42000");

      socket.addEventListener('open', () => {
        console.log("Socket open.");
      })
    
      socket.addEventListener("message", (msg) => {
        let data = JSON.parse(msg.data)
        if(!"username" in data) {
          console.log("Message from server doesn't contain user field.")
        }
        if(!"time" in data) {
          console.log("Message from server doesn't contain time field.")
        }
        if(!"message" in data) {
          console.log("Message from server doesn't contain message field.")
        }

        messages.push(data)
        setMessages([...messages])
      });
    });
    
    return () => {
      socket.disconnect()
    }
  },[])

  function submitChatMessage(e) {
    if (e.target.value == '') {
      return;
    }
    if (e.key === 'Enter' || e.keyCode === 13) {
      let date = new Date();
      let time = `${date.getHours()}:${date.getMinutes()}`
      const userMessage = {time: time, username: username, message: e.target.value}
      e.target.value = ''

      socket.send(JSON.stringify(userMessage));
    }
  }

  function changeUser(e) {
    if ((e.key === 'Enter' || e.keyCode === 13) && e.target.value) {
      setUsername(e.target.value)
      e.target.value = ''
    }
  }

  function getPrettyTime(time) {
    return <span className='font-light text-sm'>{time}</span>
  }

  return (
    <main className="flex flex-col ml-10 mt-10 w-1/2">
      <h1 className="m-4 text-gray-600 text-4xl font-extrabold">Welcome <span className='text-purple-600'>{username}</span> to the chat.</h1>
      <div className="mt-5 p-2 w-auto h-screen">
        <input className='border rounded border-stone-900 mb-2' placeholder='Change Username' onKeyDown={changeUser}></input>
        <ul className='border rounded border-stone-900 bg-slate-200 mb-2 p-2 h-5/6'>
         {messages.map((x,index) => <li key={index}>{getPrettyTime(x.time)} <b className='text-purple-600'>{x.username}:</b> {x.message}</li>)}
        </ul>
        <input className='border rounded border-stone-900 w-full' onKeyDown={submitChatMessage}></input>
      </div>
      {/* <ul className='border rounded border-stone-900 bg-slate-200 mb-2 p-2 h-5/6'>
        {users.map((x) => <li key={index}>x</li>)}
      </ul> */}
    </main>
  )
}

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
