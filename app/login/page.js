'use client'

import { useRouter } from 'next/navigation'

export default function Login() {
  const { push } = useRouter();

  function handleEnter(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.target.value ? window.localStorage.setItem('username', e.target.value) : null;
      push('/chat');
    }
  }
  

  return (
    <main className="flex flex-col ml-10 mt-10 w-1/2">
      <input className='border-black rounded' placeholder='Enter username' onKeyDown={handleEnter}></input>
    </main>
  )
}
