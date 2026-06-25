import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck, FaTrashCan, FaEye } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

export default function ApproveRiders() {
  const axiosInstance = useAxiosSecure();

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosInstance.get("/riders");
      return res.data;
    },
  });

  const pendingRiders = riders.filter((rider) => rider.status === "pending");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleApprove = async (rider) => {
    const result = await Swal.fire({
      title: "Approve Rider?",
      text: `Are you sure you want to approve ${rider.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Approve",
    });

    if (!result.isConfirmed) return;

    const updatedInfo = {
      status: "approved",
      email: rider.email,
    };

    const res = await axiosInstance.patch(`/riders/${rider._id}`, updatedInfo);

    if (res.data.modifiedCount) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Rider approved successfully!",
        showConfirmButton: false,
        timer: 1000,
      });

      refetch();
    }
  };

  const handleReject = async (rider) => {
    const result = await Swal.fire({
      title: "Reject Rider?",
      text: `Are you sure you want to reject ${rider.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Reject",
    });

    if (!result.isConfirmed) return;

    const res = await axiosInstance.patch(`/riders/${rider._id}`, {
      status: "rejected",
    });

    if (res.data.modifiedCount) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Rider rejected successfully!",
        showConfirmButton: false,
        timer: 1000,
      });

      refetch();
    }
  };

  const handleDelete = (riderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This rider will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/riders/${riderId}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Rider deleted successfully!",
              showConfirmButton: false,
              timer: 1000,
            });

            refetch();
          }
        });
      }
    });
  };

  const handleViewDetails = (rider) => {
    Swal.fire({
      title: "Rider Details",
      html: `
      <div style="text-align:left; line-height:1.6">
        <p><b>Name:</b> ${rider.name}</p>
        <p><b>Email:</b> ${rider.email}</p>
        <p><b>Phone:</b> ${rider.phone}</p>
        <p><b>NID:</b> ${rider.nid}</p>
        <p><b>Region:</b> ${rider.region}</p>
        <p><b>Bike Model:</b> ${rider.bikeModel}</p>
        <p><b>Registration:</b> ${rider.bikeRegistration}</p>
        <p><b>About:</b> ${rider.about}</p>
        <p><b>Status:</b> ${rider.status}</p>
        <p><b>Created:</b> ${new Date(rider.createdAt).toLocaleString()}</p>
      </div>
    `,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Pending Riders ({pendingRiders.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>Application Status</th>
              <th>Working Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>
                  <span
                    className={`badge ${
                      rider.status === "approved"
                        ? "badge-success"
                        : rider.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                    }`}
                  >
                    {rider.status}
                  </span>
                </td>
                <td>{rider.workingStatus}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleApprove(rider)}
                    className="btn btn-success btn-sm text-white"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleReject(rider._id)}
                    className="btn btn-warning btn-sm text-white"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button
                    onClick={() => handleDelete(rider._id)}
                    className="btn btn-error btn-sm text-white"
                  >
                    <FaTrashCan />
                  </button>
                  <button
                    onClick={() => handleViewDetails(rider)}
                    className="btn btn-info btn-sm text-white"
                  >
                    <FaEye />
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
