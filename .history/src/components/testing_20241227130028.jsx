

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
    const darkMode = useContext(themeContext)

}