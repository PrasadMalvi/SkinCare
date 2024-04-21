// MyContextProvider.js
import React, { createContext, useContext } from 'react';

const RouterContext = createContext();

const MyContextProvider = ({ children }) => {
  const basename = '/eye'; // Provide the actual value

  return <RouterContext.Provider value={{ basename }}>{children}</RouterContext.Provider>;
};

const useMyContext = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

export { MyContextProvider, useMyContext };
