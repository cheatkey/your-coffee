import React from "react";
import Logo from "@/assets/logo.svg";
import { useNavigate } from "react-router-dom";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 bg-background border-b p-4 flex justify-between items-center">
      <img
        src={Logo}
        width={120}
        alt={""}
        onClick={() => {
          navigate("/");
        }}
      />
      <nav>
        <div className="flex gap-4" id="header-content"></div>
      </nav>
    </header>
  );
};

export default Navbar;
