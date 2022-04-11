import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [monthly, setMonthly] = useState(4500);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();

    return signInWithPopup(auth, googleAuthProvider);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);

  const value = {
    currentUser,
    monthly,
    signUp,
    logout,
    login,
    googleSignIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
