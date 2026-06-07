import React from 'react'
import useAxiosSecure from './useAxiosSecure';
import UseAuth from './UseAuth';
import { useQuery } from '@tanstack/react-query';

export default function UseRole() {

    const axiosInstance = useAxiosSecure();
    const { user } = UseAuth();

    const { data: role = "customer", isLoading } = useQuery({
        queryKey: ["user-role", user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/${user?.email}/role`);
            return res.data;
            
        },
    });

  return {role, isLoading}
}
