import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { MainContextProvider } from './context/MainContext.jsx';
import { DialogContextProvider } from './context/DialogContext.jsx';
import { UserContextProvider } from './context/UserContext.jsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NextUIProvider>
      <UserContextProvider>
        <MainContextProvider>
          <DialogContextProvider>
            <App />
          </DialogContextProvider>
        </MainContextProvider>
      </UserContextProvider>
      <Toaster />
    </NextUIProvider>
  </BrowserRouter>
);
