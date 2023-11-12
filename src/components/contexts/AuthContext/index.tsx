import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextProps, AuthContextProviderProps } from './interface'
import { useApi } from '@hooks'

const AuthContext = createContext({} as AuthContextProps)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const { api } = useApi()
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')

  const fetchAuthenticated = async () => {
    const { response, error } = await api.get('/auth/protected')

    if (response) {
      setIsAuthenticated(true)
      setUsername(response.data.username)
      setName(response.data.name)
    } else {
      setIsAuthenticated(false)
      setUsername('')
      setName('')
    }
  }

  useEffect(() => {
    fetchAuthenticated()
  }, [])

  const contextValue = {
    isAuthenticated,
    username,
    name,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
