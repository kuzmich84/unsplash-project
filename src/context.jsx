import { createContext, useState, useContext, useEffect } from 'react';

const GlobalContext = createContext();

const getInitialDarkMode = () => {
    const storedDarkMode = localStorage.getItem('darkTheme') === 'true'

    return storedDarkMode || false
}

export const useGlobalContext = () => useContext(GlobalContext)

const AppContext = ({ children }) => {

    const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode())
    const [searchTerm, setSearchTerm] = useState('cat')

    const toggleDarkTheme = () => {
        setIsDarkTheme(!isDarkTheme)
        localStorage.setItem('darkTheme', !isDarkTheme)
    }

    useEffect(() => {

        document.body.classList.toggle('dark-theme', isDarkTheme);

    }, [isDarkTheme])

    return (<GlobalContext.Provider value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}>
        {children}
    </GlobalContext.Provider>)
}

export default AppContext