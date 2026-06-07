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
    <div className=" w-full">  
      <div className='mx-auto my-10 stats shadow gap-2'>
        {stats.map((item) => (
          <div className="stat bg-amber-50" >
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">{item.status}</div>
            <div className="stat-value text-secondary">{item.count}</div>
            <div className="stat-desc">Total Parcels</div>
          </div>
        ))}
      </div>
       {/* Pie Chart
       <div className="flex justify-center">
        <PieChart width={500} height={350}>
          <Pie
            data={stats}
            dataKey="count"
            nameKey="status"
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="100%"
            outerRadius={150}
            label
          >
            {stats.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </div> */}
    </div>
  );
}
