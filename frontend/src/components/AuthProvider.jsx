import {
  useEffect,
  useState,
} from "react"

import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  restoreSession,
} from "../api/auth"

import { AuthContext } from "./AuthContext"


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const boot = async () => {
      try {
        const currentUser = await restoreSession()
        setUser(currentUser)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    boot()
  }, [])

  const login = async (formData) => {
    const data = await loginRequest(formData)
    setUser(data.user)
    return data.user
  }

  const register = async (formData) => {
    const data = await registerRequest(formData)
    setUser(data.user)
    return data.user
  }

  const logout = async () => {
    await logoutRequest()
    setUser(null)
  }

  const refreshUser = async () => {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
    return currentUser
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}