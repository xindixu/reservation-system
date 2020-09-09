import React, { useState, useCallback, useContext } from "react"
import { useHistory } from "react-router-dom"
import { getItemFromStorage, setItemToStorage, KEYS, STORAGE } from "lib/client-storage"

export const UserContext = React.createContext({})

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => getItemFromStorage(STORAGE.sessionStorage, KEYS.user))
  const history = useHistory()

  const updateUser = useCallback(
    (newUser) => {
      setUser(newUser)
      setItemToStorage(STORAGE.sessionStorage, KEYS.user, newUser)
      history.push("/calendar")
    },
    [history]
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
