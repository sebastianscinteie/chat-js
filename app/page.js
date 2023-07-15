import Link from 'next/link'

export default function Home() {

  return (
    <main className="flex flex-col ml-10 mt-10 w-1/2">
      <h1 className="m-4 text-blue-800 text-4xl font-extrabold">CHAT.</h1>
      <div className="mt-5 p-2 w-auto h-screen">
        <button><Link href="/login">Login</Link></button>
      </div>   
    </main>
  )
}
