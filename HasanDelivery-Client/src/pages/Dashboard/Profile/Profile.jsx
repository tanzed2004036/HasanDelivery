import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import { FaUserCircle, FaEnvelope, FaCheckCircle } from "react-icons/fa";

export default function Profile() {
  const { user } = UseAuth();

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center p-4">
      <div className="w-full max-w-md   p-6 md:p-8">
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="Profile"
            className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-primary object-cover"
          />

          <h2 className="mt-4 text-2xl font-bold text-center">
            {user?.displayName || "No Name"}
          </h2>

          <span className="badge badge-primary mt-2">
            {user?.emailVerified ? "Verified User" : "Unverified User"}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-base-200">
            <FaUserCircle className="text-primary text-xl" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-xs sm:text-[9px] md:text-base font-semibold break-all">
                {user?.displayName || "Not Available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-base-200">
            <FaEnvelope className="text-primary text-xl" />
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="text-xs sm:text-[9px] md:text-base font-semibold break-all">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-base-200">
            <FaCheckCircle
              className={`text-xl ${
                user?.emailVerified ? "text-green-500" : "text-red-500"
              }`}
            />
            <div>
              <p className="text-sm text-gray-500">Email Verification</p>
              <p
                className={`font-semibold ${
                  user?.emailVerified ? "text-green-600" : "text-red-600"
                }`}
              >
                {user?.emailVerified ? "Verified ✅" : "Not Verified ❌"}
              </p>
            </div>
          </div>
        </div>

        <button className="btn btn-error w-full mt-8">Edit Profile</button>
      </div>
    </div>
  );
}
