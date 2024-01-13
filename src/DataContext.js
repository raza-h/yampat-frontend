// DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [out, setOut] = useState({}); // Initial value for 'out' state

  return (
    <DataContext.Provider value={{ out, setOut }}>
      {children}
    </DataContext.Provider>
  );
};
