import React from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
const Navbar = () => {
  return (
    <header className="h-[80px] w-full border-b border-[#1a1b1f] bg-[#0c0d0f]">
      <div className="mx-auto flex h-full max-w-[1920px] items-center justify-between px-10">

        {/* Logo */}
        <div className="flex items-center gap-4">
          {/* Dumbbell Icon */}
          <Image src={Logo} alt="Logo" />

          <span className="text-[32px] font-extrabold tracking-wide text-white">
            FITLOG
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <a
            href="#"
            className="rounded-full bg-[#111d05] px-7 py-3 text-[18px] font-semibold text-[#c6ff00]"
          >
            Workouts
          </a>

          <a
            href="#"
            className="text-[18px] font-medium text-[#92949d] transition-colors hover:text-white"
          >
            My Plan
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-10">
          {/* Plan */}
          <div className="flex items-center gap-3">
            <span className="text-[18px] font-medium text-[#b8bac2]">
              Plan
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c6ff00] text-[15px] font-bold text-black">
              0
            </span>
          </div>

          {/* Saved */}
          <div className="flex items-center gap-3">
            <span className="text-[18px] font-medium text-[#b8bac2]">
              Saved
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#34363d] text-[15px] font-medium text-[#b8bac2]">
              0
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
