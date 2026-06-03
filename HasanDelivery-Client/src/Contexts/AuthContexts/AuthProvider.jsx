import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../Firebase/Firebase";
import { AuthContext } from "./AuthContext";

const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // user registration using email and password
  const RegisterUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // send verification email
  const SendVerificationMail = () =>{
    return sendEmailVerification(auth.currentUser)
  }

  // user sign in using email & password
  const SigninUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // user sign in using google
  const SignInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };

  //Logout
  const Logout = () => {
    return signOut(auth);
  };

    // upadate user profile 
  const UpdateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // Reset password email
  const ResetPassMail = (email) =>{
    return sendPasswordResetEmail(auth, email)
  }

  // user current state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
    });
    return () => {
      unsubscribe();
    };
  }, []);


  

  const userInfo = {
    user,
    loading,
    RegisterUser,
    SigninUser,
    SignInWithGoogle,
    Logout,
    UpdateUserProfile,
    SendVerificationMail,
    ResetPassMail

  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
