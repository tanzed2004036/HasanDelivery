import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";

export default function ParcelTrack() {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const { data: trackings = [], isLoading } = useQuery({
    queryKey: ["trackParcel", trackingId],

    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Tracking ID: {trackingId}</h2>

      <ul className="timeline timeline-vertical">
        {trackings.map((log, index) => (
          <li key={log._id}>
            {index !== 0 && <hr />}

            <div className="timeline-start">
              {new Date(log.createdAt).toLocaleString()}
            </div>

            <div className="timeline-middle">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            </div>

            <div className="timeline-end mb-6">
              <div className="card bg-base-200 shadow-md p-3">
                <h3 className="font-bold capitalize">
                  {log.status.replaceAll("_", " ")}
                </h3>
                <p className="text-sm text-gray-500">{log.details}</p>
                <p className="text-xs text-gray-400">
                  Tracking ID: {log.trackingId}
                </p>
              </div>
            </div>

            {index !== trackings.length - 1 && <hr />}
          </li>
        ))}
      </ul>
    </div>
  );
}
