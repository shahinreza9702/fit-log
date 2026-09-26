"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/logo.png";
import { useWorkout } from "@/context/WorkoutContext";

const Navbar = () => {
  const pathname = usePathname();
  const { planCount, savedCount } = useWorkout();

  return (
    <header className="h-[80px] w-full border-b border-[#1a1b1f] bg-[#0c0d0f]">
      <div className="mx-auto flex h-full max-w-[1920px] items-center justify-between px-10">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-4"
          >
            <Image
              src={Logo}
              alt="Fitlog Logo"
            />

            <span className="text-[32px] font-extrabold tracking-wide text-white">
              FITLOG
            </span>
          </Link>
        </div>


        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className={`rounded-full px-7 py-3 text-[18px] font-semibold transition-colors ${
              pathname === "/"
                ? "bg-[#111d05] text-[#c6ff00]"
                : "text-[#92949d] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/myplan"
            className={`rounded-full px-7 py-3 text-[18px] font-semibold transition-colors ${
              pathname === "/myplan"
                ? "bg-[#111d05] text-[#c6ff00]"
                : "text-[#92949d] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-10">
          {/* Plan */}
          <Link href="/myplan" className="flex items-center gap-3">
            <span className="text-[18px] font-medium text-[#b8bac2]">
              Plan
            </span>

            <span className="flex items-center rounded-full bg-[#c6ff00] px-3 py-1 text-[15px] font-bold text-black">
              {planCount}
            </span>
          </Link>

          {/* Saved */}
          <Link href="/myplan" className="flex items-center gap-3">
            <span className="text-[18px] font-medium text-[#b8bac2]">
              Saved
            </span>

            <span className="flex items-center rounded-full border border-[#34363d] px-3 py-1 text-[15px] font-medium text-[#b8bac2]">
              {savedCount}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
