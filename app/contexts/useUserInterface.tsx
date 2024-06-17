// userInterfaceContext.tsx
import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { UI_Generator } from './types';

interface UIState {
  pageStyles: {
    display: 'flex',

  }
}

interface UserInterfaceContextType {
  
}

const UserInterfaceContext = createContext<UserInterfaceContextType | undefined>(undefined);

interface UserInterfaceProviderProps {
  children: ReactNode;
}

export const UserInterfaceProvider: React.FC<UserInterfaceProviderProps> = ({ children }) => {
  

  return (
    <UserInterfaceContext.Provider value={{}}>
      {children}
    </UserInterfaceContext.Provider>
  );
};

// Create the custom hook
const useUserInterface = (): UserInterfaceContextType => {
  const context = useContext(UserInterfaceContext);
  if (context === undefined) {
    throw new Error('useUserInterface must be used within a UserInterfaceProvider');
  }
  return context;
};

export default useUserInterface;
