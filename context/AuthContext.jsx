"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

// Usuario y contraseña por defecto
const ADMIN_USER = {
  username: 'admin',
  password: 'fami2024',
  name: 'Administrador FAMI',
  role: 'admin'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay sesión guardada
    const savedUser = localStorage.getItem('fami_admin_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      const userData = {
        username: ADMIN_USER.username,
        name: ADMIN_USER.name,
        role: ADMIN_USER.role,
        loginTime: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('fami_admin_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Usuario o contraseña incorrectos' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fami_admin_user');
    router.push('/admin/login');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
