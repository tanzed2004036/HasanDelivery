import React from "react";
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function UserDashboardHome() {
  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
        <p className="mt-2 text-sm md:text-base">
          Manage your parcels, track deliveries, and view payment history all in
          one place.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body items-center text-center">
            <FaBox className="text-4xl text-primary" />
            <h2 className="card-title">Total Parcels</h2>
            <p className="text-3xl font-bold">24</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body items-center text-center">
            <FaTruck className="text-4xl text-warning" />
            <h2 className="card-title">In Transit</h2>
            <p className="text-3xl font-bold">8</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body items-center text-center">
            <FaCheckCircle className="text-4xl text-success" />
            <h2 className="card-title">Delivered</h2>
            <p className="text-3xl font-bold">14</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body items-center text-center">
            <FaMoneyBillWave className="text-4xl text-info" />
            <h2 className="card-title">Payments</h2>
            <p className="text-3xl font-bold">৳12,500</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Recent Activity</h2>

            <div className="space-y-3 mt-3">
              <div className="flex justify-between border-b pb-2">
                <span>📦 Parcel booked</span>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>🚚 Parcel picked up</span>
                <span className="text-sm text-gray-500">Yesterday</span>
              </div>

              <div className="flex justify-between">
                <span>✅ Parcel delivered</span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}