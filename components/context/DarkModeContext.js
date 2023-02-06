import { useContext, createContext, useEffect, useState } from 'react';

const ThemeStateContext = createContext();
const ThemeDispatchContext = createContext();


export const DarkModeProvider = ({children}) => {

    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const toggleDarkModeHandler = () => {
            theme === 'light' ? setTheme('dark') : setTheme('light');
            document.body.classList.toggle('dark');
        }
        toggleDarkModeHandler()
    }, [])
    
    return (
        <ThemeDispatchContext.Provider value={setTheme}>
            <ThemeStateContext.Provider value={theme}>
                {children}
            </ThemeStateContext.Provider>
        </ThemeDispatchContext.Provider>
    )

}

export const useTheme = () => useContext(ThemeStateContext);
export const useDispatchTheme = () => useContext(ThemeDispatchContext);