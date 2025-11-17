"use client"
import { getText } from '@/lib/chat'
import React from 'react'

const Chatbox = () => {
  const handleClick = async () => {
   
    const data = await getText();
    console.log(data)
  }
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

export default Chatbox