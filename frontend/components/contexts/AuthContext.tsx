import React, { FC, useContext, useEffect, useState } from 'react'
import { setupUserListener } from '../../services/auth'
import { User } from '../../utils/types'

const AuthContext = React.createContext<AuthContextData>({
  isLoading: true,
  isConnected: false,
  user: undefined,
})

type AuthContextData = {
  isLoading: boolean
  isConnected: boolean
  user: User | undefined
}

type Props = {}

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    // On crée le user listener et on return le unsubscribe qui sera appelé à la destruction du component.
    return setupUserListener((u) => {
      setUser(u as User)
    })
  }, [])

  const value: AuthContextData = {
    isLoading: user === undefined,
    isConnected: !!user,
    user,
  }

  return (
    <AuthContext.Provider value={value}>
      <div>{children}</div>
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
