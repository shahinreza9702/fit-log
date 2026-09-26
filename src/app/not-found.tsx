import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0C0D10] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <p className="text-xl text-zinc-400 mb-8 max-w-md mx-auto">
          Page not found. The workout you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#baff00] px-8 py-3 text-base font-semibold text-black transition hover:bg-[#c7ff33]"
        >
          Back to Workouts
        </Link>
      </div>
    </div>
  );
}