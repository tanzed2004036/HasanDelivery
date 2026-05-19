import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AboutUs from "../pages/AboutUs/AboutUs";
import Error from "../pages/Error/Error";

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
      {path: "*", Component: Error}
      
    ],
  },
]);