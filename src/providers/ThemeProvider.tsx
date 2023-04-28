import {themesNames} from "../constants/server-const";
import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {useTypedSelector} from "../store/store";
import {store} from "../index";

export const useTheme = () => useContext(ThemeContext)

interface IContext {
  theme: themesNames,
  changeTheme: (theme: themesNames) => void,
}

const ThemeContext = createContext<IContext>({
  theme: themesNames.default,
  changeTheme: () => {}
})

interface ProviderProps {
    children: ReactNode
}

export const ThemeProvider = ({children, ...props}: ProviderProps) => {
  const [theme, setTheme] = useState(themesNames.default)

  const changeTheme = (theme: themesNames) => {
    setTheme(theme)
  }

  return <ThemeContext.Provider value={{theme, changeTheme,}} {...props}>
    {children}
  </ThemeContext.Provider>
}