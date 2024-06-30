
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie'; // Import Cookies library

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const storedUser = Cookies.get('currentUser');
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (user) => {
//     if (user) {
//       setCurrentUser(user);
//       Cookies.set('currentUser', JSON.stringify(user), { expires: 7 }); // Store user data in cookies
//     } else {
//       console.error("No user data received.");
//     }
//   };

//   const logout = () => {
//     setCurrentUser(null);
//     Cookies.remove('currentUser'); // Remove user data from cookies on logout
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   const storedUser = Cookies.get('currentUser');
  //   if (storedUser) {
  //     setCurrentUser(JSON.parse(storedUser));
  //   }
  // }, []);

  const login = (user) => {
    setCurrentUser(user);
    // if (user) {
      
    //   Cookies.set('currentUser', JSON.stringify(user), { expires: 7 });
    // } else {
    //   console.error("No user data received.");
    // }
  };

  const logout = () => {
    setCurrentUser(null);
    Cookies.remove('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
