import React, { createContext, useState } from 'react'

const themeContext = createContext()

export const testing = () => {
    const[theme,setTheme] = useState()
  return (
    <div>testing</div>
  )
}