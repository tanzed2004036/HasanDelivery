import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserShield, FaTrash, FaEye } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa6";
import { useState } from "react";

export default function UserManagement() {
  const axiosInstance = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?searchText=${searchText}`);
      return res.data;
    },
    enabled: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ✅ Change Role
  const handleMakeAdmin = (id) => {
    axiosInstance.patch(`/users/${id}/role`, { role: "admin" }).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire("Success", "User promoted to admin", "success");
        refetch();
      }
    });
  };

  const handleRemoveAdmin = (id) => {
    axiosInstance
      .patch(`/users/${id}/role`, { role: "customer" })
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire("Success", "Admin removed", "success");
          refetch();
        }
      });
  };

  // ✅ Delete User
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/users/${id}`).then(() => {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          refetch();
        });
      }
    });
  };

  // ✅ View Details
  const handleView = (user) => {
    Swal.fire({
      title: user.name,
      html: `
        <div style="text-align:left; line-height:1.6">
          <img src="${user.photo}" width="80" style="border-radius:50%; margin-bottom:10px"/>
          <p><b>Email:</b> ${user.email}</p>
          <p><b>Role:</b> ${user.role}</p>
          <p><b>Created:</b> ${new Date(user.createdAt).toLocaleString()}</p>
        </div>
      `,
      icon: "info",
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input 
        value={searchText}
        onChange={(e)=>setSearchText(e.target.value)} type="search" className="grow" placeholder="Search" />
      </label>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>
                  <img
                    src={user.photo}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </td>

                <td>{user.name}</td>
                <td>{user.email}</td>

                {/* Role Badge */}
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-success"
                        : user.role === "rider"
                          ? "badge-warning"
                          : "badge-neutral"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Actions */}
                <td className="flex gap-2">
                  <button
                    onClick={() => handleView(user)}
                    className="btn btn-info btn-sm text-white"
                  >
                    <FaEye />
                  </button>

                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user._id)}
                      className="btn btn-warning btn-sm text-white"
                    >
                      <FaUserMinus />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-success btn-sm text-white"
                    >
                      <FaUserShield />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-error btn-sm text-white"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
