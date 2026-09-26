import Banner from "@/components/homepage/Banner";
import WorkoutGrid from "@/components/homepage/WorkoutGrid";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <Banner />

      {/* Library Header */}
      <section id="library" className="mb-6 mt-8">
        <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          THE LIBRARY
        </h2>
        <p className="mt-1 text-sm text-[#8d929d]">
          Twelve lifts covering every major muscle group.
        </p>
      </section>

      <WorkoutGrid />
    </div>
  );
}