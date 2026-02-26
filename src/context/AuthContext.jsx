import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({ id: 1, name: 'Demo User', role: 'admin', email: 'demo@clearlend.com' });
    const [token, setToken] = useState(localStorage.getItem('token') || 'demo-token');
    const [loading, setLoading] = useState(true);

    // Initialize state from local storage on load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && token !== 'demo-token') {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setToken(data.token);
            setCurrentUser(data.user);
            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (email, password, role, name) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role, name })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setToken(data.token);
            setCurrentUser(data.user);
            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!currentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
