import React, { createContext, useContext, useState } from 'react'

const countContext = createContext()

export const testing = () => {

    const [count,setCount] = useState(0)
  return (
    <div>
        <countContext.Provider value={{count,setCount}}>
            <main/>
        </countContext.Provider>
    </div>
  )
}


function main(){
    const {count,setCount} = useContext(countContext)

    return(
        <div>
            <button></button>
        </div>
    )
}