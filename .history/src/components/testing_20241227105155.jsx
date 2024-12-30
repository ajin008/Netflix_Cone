import React, { createContext, useState } from 'react'

const themeContext = createContext()

export const testing = () => {
    const[darkmode,setTheme] = useState(false)
  return (
    <>
     <themeContext.Provider value={th}>

     </themeContext.Provider>
    </>
  )
}
