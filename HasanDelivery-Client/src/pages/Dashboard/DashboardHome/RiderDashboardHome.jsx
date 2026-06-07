import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";


export default function RiderDashboardHome() {
  const axiosSecure = useAxiosSecure();
  const {user} = UseAuth()
  const { data = [], isLoading } = useQuery({
    queryKey: ["rider-delivery-per-day"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/delivery-per-day?email=${user.email}`
      );
      return res.data;
    },
  });
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-5">
        📦 Daily Delivery Report
      </h2>

      {/* TABLE VIEW (DaisyUI) */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Total Delivered</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>
                  {item._id.day}/{item._id.month}
                </td>

                <td className="font-bold text-primary">
                  {item.count}
                </td>

                <td>
                  {item.count >= 5 ? (
                    <span className="badge badge-success">
                      Excellent
                    </span>
                  ) : item.count >= 2 ? (
                    <span className="badge badge-warning">
                      Average
                    </span>
                  ) : (
                    <span className="badge badge-error">
                      Low
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

        <div className="stat shadow">
          <div className="stat-title">Total Days</div>
          <div className="stat-value text-primary">
            {data.length}
          </div>
        </div>

        <div className="stat shadow">
          <div className="stat-title">Total Deliveries</div>
          <div className="stat-value text-success">
            {data.reduce((sum, item) => sum + item.count, 0)}
          </div>
        </div>

        <div className="stat shadow">
          <div className="stat-title">Best Day</div>
          <div className="stat-value text-warning">
            {Math.max(...data.map((d) => d.count))}
          </div>
        </div>

      </div>
    </div>
  );
}
