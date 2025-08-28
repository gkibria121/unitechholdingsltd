// contexts/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react'

// Create the Auth Context
const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        // Load user and token from localStorage on initial load
        if (typeof window !== 'undefined') {
            const savedUser = JSON.parse(localStorage.getItem('user'))
            const savedToken = localStorage.getItem('token')
            if (savedUser && savedToken) {
                setUser(savedUser)
                setToken(savedToken)
            }
        }
    }, [])

    const login = async (email, password) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_UNITECH_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Ensures cookies are sent with request
                body: JSON.stringify({ email, password }),
            })

            if (response.ok) {
                const data = await response.json()
                setToken(data.token)
                setUser(data.user)

                // Save to localStorage
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                return true
            } else {
                const errorData = await response.json()
                console.error(errorData.message)
                return false
            }
        } catch (error) {
            console.error('Login failed:', error)
            return false
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
