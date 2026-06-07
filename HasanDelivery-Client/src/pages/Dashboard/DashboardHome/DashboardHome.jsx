import React from "react";
import UseRole from "../../../hooks/UseRole";
import AdminDashboardHome from "./AdminDashboardHome";
import UserDashboardHome from "./UserDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";

export default function DashboardHome() {
  const { role } = UseRole();
  if (role.role === "admin") {
    return <AdminDashboardHome />;
  }
  else if (role.role === "rider") {
    return <RiderDashboardHome />;
  }
  else {
    return <UserDashboardHome />;
  }
}
