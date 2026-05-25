import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AboutUs from "../pages/AboutUs/AboutUs";
import Error from "../pages/Error/Error";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/SendParcel/SendParcel";
import DaashboardLayout from "../layouts/DaashboardLayout";
import MyParcel from "../pages/Dashboard/MyParcel/MyParcel";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancel";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "coverage", 
        Component: Coverage,
        loader:()=> fetch('/Service-center.json').then(res => res.json())
      },
      {path: "about", Component: AboutUs},
      {path: "*", Component: Error},
      {path:'rider',element:<PrivateRoute><Rider></Rider></PrivateRoute>},
      {path:'send-parcel',
        element:<PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
        loader:()=> fetch('/Service-center.json').then(res => res.json())
      }
      
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {path:"login", Component: Login},
      {path:"register",Component:Register}
    ]
  },
  {
    path:'/dashboard',
    element:<PrivateRoute><DaashboardLayout/></PrivateRoute>     ,
    children:[
      {path:'my-parcel',Component:MyParcel},
    {path:'payment/:parcelId',Component:Payment},
    {path:'payment-success',Component:PaymentSuccess},
    {path:'payment-canceled',Component:PaymentCancel},
    {path:'payment-history',Component:PaymentHistory}
    ]
  }
]);