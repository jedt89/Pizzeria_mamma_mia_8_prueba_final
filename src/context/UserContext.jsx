import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { loginSession } from '../service/login';

const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [tokenValue, setTokenValue] = useState(false);
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
  };

  const login = async (email, pass) => {
    try {
      const response = await loginSession(email, pass);
      setTokenValue(response);
      setToken(true);
      setUserMail(email);
      setUserName(email);
    } catch (error) {
      setToken(null);
      throw new Error('Error al iniciar sesión');
    }
  };

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
