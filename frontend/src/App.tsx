import React from 'react'
import io from 'socket.io-client'

const app = () => {
    const socket = io("http://localhost:3001")
  return (
    <div>app</div>
  )
}

export default app