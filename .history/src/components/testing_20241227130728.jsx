import React, { createContext, useContext, useState } from 'react'

let countContext = createContext()

export const testing = () => {
    const[count,setCount] = useState(0)
  return (
    <div>
        <context.Provider value={{count,setCount}}>
            <main/>
        </context.Provider>
    </div>
  )
}

function main(){
    let {count,setCount} = useContext(countContext)

    return(
        <div>
            <button onClick={()=> setCount(count+1)}></button>
            <button onClick={()=> setCount(count-1)}></button>
        </div>
    )
}