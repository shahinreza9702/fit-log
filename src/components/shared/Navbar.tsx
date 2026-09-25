import React from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
const Navbar = () => {
  return (
    <nav className="base-100 bg-[#0C0D10] text-white">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="logo">
            <Image src={Logo} alt="Logo" />
          </div>
          <div className="flex items-center gap-2">
            <button className="btn bg-[#1A2312] rounded-full text-green-500 border-black">
              Workout
            </button>
            <button>My Plan</button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <p>Plan</p>
              <p>0</p>
            </div>
            <div className="flex gap-2">
              <p>Save</p>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
