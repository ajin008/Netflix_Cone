import React, { createContext, useContext, useState } from 'react'

const themeContext = createContext()

export const testing = () => {
    const[darkMode,setDarkMode] = useState(false)
  return (
    <>
     <themeContext.Provider value={darkMode}>
        <navBar/>
     </themeContext.Provider>
    </>
  )
}


function navBar(){
    const darkMode = useContext()
}