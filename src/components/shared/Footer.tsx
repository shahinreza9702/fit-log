import React from "react";
import Image from "next/image";
import Logo from '@/assets/footer-logo.png'
const Footer = () => {
  return (
    <footer className="bg-[#090A0D] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-360">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            {/* Dumbbell Icon */}
            <Image src={Logo} alt="Logo" width={30} />

            <span className="text-[32px] font-extrabold tracking-wide text-white">
              FITLOG
            </span>
          </div>
          <p className="text-[#6B7280] text-sm">&copy; 2026 FitLog — Workout Library. Train hard, log honest.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
