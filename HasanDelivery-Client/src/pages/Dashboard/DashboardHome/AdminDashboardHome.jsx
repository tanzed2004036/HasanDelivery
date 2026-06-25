import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { PieChart, Pie, Tooltip, Legend } from "recharts";

export default function AdminDashboardHome() {
  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["delivery-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-stats/stats");
      return res.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
  <div className="w-full p-4 md:p-8">
    {/* Heading */}
    <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
      Delivery Statistics
    </h1>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-amber-50 rounded-xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-lg transition"
        >
          <div className="text-secondary mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-10 w-10 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          <div className="text-sm text-gray-500 capitalize">
            {item.status}
          </div>

          <div className="text-2xl md:text-3xl font-bold text-secondary">
            {item.count}
          </div>

          <div className="text-xs text-gray-400 mt-1">
            Total Parcels
          </div>
        </div>
      ))}
    </div>

    {/* Pie Chart Section */}
    <div className="mt-10 flex justify-center">
      {/* PieChart container responsive */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        {/* PieChart will go here */}
      </div>
    </div>
  </div>
);
}