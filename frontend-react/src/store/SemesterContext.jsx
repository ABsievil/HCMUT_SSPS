import { createContext, useContext } from 'react';

const SemesterContext = createContext();

export const SemesterProvider = ({ children }) => {
  return (
    <SemesterContext.Provider value={semester}>
      {children}
    </SemesterContext.Provider>
  );
};

export const useSemester = () => useContext(SemesterContext);