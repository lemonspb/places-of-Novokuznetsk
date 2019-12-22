import React, { useEffect, useState } from "react";
import firebases from "../../services/base";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    firebases.auth().onAuthStateChanged((authState)=>{
      setCurrentUser(authState)
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};