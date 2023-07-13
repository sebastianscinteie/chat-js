import Image from 'next/image'

const messages = ['08:52 user1: wot how cool', '12:23 pamboot: why is my name pamboot?', '04:23 repeat: this message is on reapeat', '04:23 repeat: this message is on reapeat', '04:23 repeat: this message is on reapeat', '04:23 repeat: this message is on reapeat']

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl m-4">Welcome to the chat.</h1>
      <ul className="bg-amber-700 m-4 p-2">
        {messages.map((m,index) => <li key={index}>{m}</li>)}
      </ul>
    </main>
  )
}
