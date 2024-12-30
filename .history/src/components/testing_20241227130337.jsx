import React, { createContext, useState } from 'react'

let context = createContext()

export const testing = () => {
    const[count,setCount] = useState(0)
  return (
    <div>
        <context.Provider value={setCount}>
            <main/>
        </context.Provider>
    </div>
  )
}

function main(){
    let set
}