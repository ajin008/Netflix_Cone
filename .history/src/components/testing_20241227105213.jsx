import React, { createContext, useState } from 'react'

const themeContext = createContext()

export const testing = () => {
    const[darkMode,setDarkMode] = useState(false)
  return (
    <>
     <themeContext.Provider value={darkmode}>

     </themeContext.Provider>
    </>
  )
}
