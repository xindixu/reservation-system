import React, { useState, useCallback, useContext } from "react"
import { useTranslation } from "react-i18next"
import {
  getItemFromStorage,
  setItemToStorage,
  removeItemFromStorage,
  KEYS,
  STORAGE,
} from "lib/client-storage"
import { languageMapping } from "locales/index"

export const UserContext = React.createContext({})

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => getItemFromStorage(STORAGE.sessionStorage, KEYS.user))
  const { i18n } = useTranslation()

  const updateUser = useCallback(
    (newUser) => {
      if (newUser?.locale !== user?.locale) {
        i18n.changeLanguage(languageMapping[newUser?.locale])
      }
      if (newUser) {
        setUser(newUser)
        setItemToStorage(STORAGE.sessionStorage, KEYS.user, newUser)
      } else {
        setUser(null)
        removeItemFromStorage(STORAGE.sessionStorage, KEYS.user)
      }
    },
    [i18n, user?.locale]
  )

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
}

export const UserContextConsumer = UserContext.Consumer

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUserContext must be used within UserContextProvider")
  }
  return context || {}
}
