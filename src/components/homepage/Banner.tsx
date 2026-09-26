import React from 'react';
import Image from 'next/image';
import banner from '@/assets/banner.png'

const Banner = () => {
  return (
    <section className="relative mb-12 min-h-[325px] overflow-hidden rounded-xl border border-[#272d38] bg-[#15171d]">

      <div className="relative z-10 flex min-h-[325px] items-center px-8 py-10 sm:px-10 lg:w-[65%]">

        <div>
          {/* Small label */}
          <p className="mb-5 text-xs font-bold tracking-wider text-[#c6ff00]">
            WORKOUT LIBRARY
          </p>

          {/* Heading */}
          <h1 className="max-w-[650px] text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-[560px] text-sm leading-6 text-[#8d929d] sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and own the week&apos;s work add up.
          </p>

          {/* Button */}
          <button
            type="button"
            className="mt-6 rounded-md bg-[#c6ff00] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#d4ff4d] active:scale-95"
          >
            BROWSE WORKOUTS
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="absolute right-4 bottom-0 hidden h-[90%] w-[35%] items-end justify-center lg:flex">
        <Image
          src={banner}
          alt="Workout"
          fill
          className="object-contain"
        />

      </div>
    </section>
  );
};

export default Banner;