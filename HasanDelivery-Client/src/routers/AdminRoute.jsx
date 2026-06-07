import React from 'react'
import UseRole from '../hooks/UseRole';
import { Navigate } from 'react-router';

export default function AdminRoute({ children }) {
    const {role, isLoading} = UseRole();
    if(isLoading){  
        return <div>    
        <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    if(role.role !== "admin" ){
        alert("You are not authorized to access this page");
        return <Navigate to="/" replace />
    }
  return (
    children
  )
}

