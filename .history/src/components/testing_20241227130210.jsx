import React, { createContext, useState } from 'react'

let context = createContext()

export const testing = () => {
    const[count,setCount] = useState()
  return (
    <div>testing</div>
  )
}
