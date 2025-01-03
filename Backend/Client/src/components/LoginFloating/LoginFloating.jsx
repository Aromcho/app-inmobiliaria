// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('@token');
      const name = await AsyncStorage.getItem('@name');
      const userId = await AsyncStorage.getItem('@user_id');
    
      if (token) {
        setUser({ token, name: name || 'Invitado', id: userId });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  // Función de inicio de sesión
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://belga.com.ar:6080/api/auth/login', {
        email,
        password
      });
      const { token, name, userId } = response.data;

      await AsyncStorage.setItem('@token', token);
      await AsyncStorage.setItem('@name', name);
      await AsyncStorage.setItem('@user_id', userId);

      setUser({ token, name, id: userId });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  // Función de cierre de sesión
  const logout = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: user && user.token !== 'guest',
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
