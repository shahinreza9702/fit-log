import Banner from "@/components/homepage/Banner";
import WorkoutGrid from "@/components/homepage/WorkoutGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0C0D10] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-360">
        <Banner />
        {/* Library Header */}
        <section className="mb-6">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            THE LIBRARY
          </h2>

          <p className="mt-1 text-sm text-[#8d929d]">
            Twelve lifts covering every major muscle group.
          </p>
        </section>

        <WorkoutGrid />
      </div>
    </main>
  );
}
