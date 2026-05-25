import React from "react";
import UseAuth from "../hooks/UseAuth";
import { Navigate, useLocation, useNavigate } from "react-router";
import { signOut } from "firebase/auth";

export default function PrivateRoute({ children }) {
  const { user, loading,Logout } = UseAuth();
   const location = useLocation();

  if (loading) {
    return;
    <div>
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  // not logged in
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // not verified 
  if (!user.emailVerified) {
    alert("Please verify your email first");
   Logout();

  return (
    <Navigate to="/auth/login" replace />
  );
}
  return children;
}
