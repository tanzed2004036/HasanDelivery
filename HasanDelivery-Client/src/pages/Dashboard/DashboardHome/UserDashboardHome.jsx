import React from "react";
import {
  FaBox,
  FaTruck,
  FaHistory,
  FaMapMarkedAlt,
} from "react-icons/fa";

export default function UserDashboardHome() {
  return (
    <div className="p-4 md:p-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white p-6 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome to Your Dashboard 👋
        </h1>

        <p className="mt-2 text-sm md:text-base opacity-90">
          Manage your parcels, track deliveries, and view your payment history
          from one convenient place.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

        <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
          <div className="card-body items-center text-center">
            <FaBox className="text-4xl text-primary" />
            <h2 className="card-title mt-2">My Parcels</h2>
            <p className="text-sm text-gray-500">
              View and manage all your parcel requests.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
          <div className="card-body items-center text-center">
            <FaTruck className="text-4xl text-warning" />
            <h2 className="card-title mt-2">Track Parcel</h2>
            <p className="text-sm text-gray-500">
              Track your parcel with a tracking ID.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
          <div className="card-body items-center text-center">
            <FaHistory className="text-4xl text-success" />
            <h2 className="card-title mt-2">Payment History</h2>
            <p className="text-sm text-gray-500">
              Check all your previous payment records.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
          <div className="card-body items-center text-center">
            <FaMapMarkedAlt className="text-4xl text-info" />
            <h2 className="card-title mt-2">Coverage Area</h2>
            <p className="text-sm text-gray-500">
              Explore our nationwide delivery coverage.
            </p>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="mt-8">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Need Help?</h2>

            <p className="text-gray-600">
              You can create a new parcel, track existing deliveries, manage
              payments, and update your profile anytime from your dashboard.
            </p>

            <div className="alert alert-success mt-4">
              <span>
                🚚 We are committed to delivering your parcels safely and on
                time.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}