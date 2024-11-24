import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
interface LayoutProps {}

const Layout = ({}: LayoutProps) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
