import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { loginSession } from '../service/login';

const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [tokenValue, setTokenValue] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userMail, setUserMail] = useState(null);

  const logout = () => {
    setToken(false);
    setTokenValue(null);
    setUserMail(null);
    setUserName(null);
    toast.success('Has cerrado sesión exitosamente', {
      position: 'top-right'
    });
    localStorage.clear()
  };

  const login = async (email, pass) => {
    try {
      const response = await loginSession(email, pass);
      setTokenValue(response);
      setToken(true);
      setUserMail(email);
      setUserName(email);
      localStorage.setItem('tokenValue', response)
      localStorage.setItem('email', email)
    } catch (error) {
      setToken(null);
      throw new Error('Error al iniciar sesión');
    }
  };

  useEffect(() => {
    const tokenSession = localStorage.getItem('tokenValue')
    if (tokenSession) {
      const mail = localStorage.getItem('email')
      setToken(true);
      setTokenValue(tokenSession);
      setUserMail(mail);
      setUserName(mail);
    }
  }, [])
  
  return (
    <UserContext.Provider
      value={{
        token,
        tokenValue,
        userName,
        userMail,
        logout,
        login
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
