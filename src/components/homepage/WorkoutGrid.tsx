"use client";

import React, { useState, useEffect, useMemo } from "react";
import WorkoutCard from "./WorkoutCard";
import { IWorkout } from "@/types/WorkoutTypes";
import { ChevronDown, Search } from "lucide-react";

type SortOption = "duration" | "calories" | "rating";

const SORT_LABELS: Record<SortOption, string> = {
  duration: "Duration",
  calories: "Calories",
  rating: "Rating",
};

export default function WorkoutGrid() {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [sortOpen, setSortOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) throw new Error("Failed to fetch workout data");
        const data = (await res.json()) as IWorkout[];
        if (!cancelled) setWorkouts(data);
      } catch {
        if (!cancelled) setError("Could not load workouts. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchWorkouts();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = workouts;
    if (q) {
      list = list.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.muscleGroups.some((m) => m.toLowerCase().includes(q)) ||
          w.equipment.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => {
      switch (sortBy) {
        case "duration":
          return a.duration - b.duration;
        case "calories":
          return a.caloriesBurned - b.caloriesBurned;
        case "rating":
          return a.rating - b.rating;
      }
    });
  }, [workouts, search, sortBy]);

  if (loading) {
    return (
      <section
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        aria-busy="true"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <article
            key={i}
            className="overflow-hidden rounded-xl border border-[#292f3a] bg-[#15171d] animate-pulse"
          >
            <div className="h-[190px] bg-[#1a1d24]" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-[#1a1d24] rounded w-1/4" />
              <div className="h-6 bg-[#1a1d24] rounded w-3/4" />
              <div className="h-4 bg-[#1a1d24] rounded w-1/2" />
              <div className="my-4 h-px bg-[#242831]" />
              <div className="flex items-center gap-4">
                <div className="h-4 bg-[#1a1d24] rounded w-20" />
                <div className="h-4 bg-[#1a1d24] rounded w-20" />
                <div className="h-4 bg-[#1a1d24] rounded w-20" />
              </div>
            </div>
          </article>
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-900/40 bg-red-950/20 px-6 py-12 text-center">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workouts by name, tag, or equipment..."
            aria-label="Search workouts"
            className="w-full rounded-lg border border-zinc-800 bg-[#15181f] py-2.5 pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#c6ff00]"
          />
        </div>

        <div className="relative">
          <span className="mr-2 text-xs text-zinc-400">Sort By</span>
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-[#15181f] px-3 py-2 text-xs"
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
          >
            {SORT_LABELS[sortBy]}
            <ChevronDown
              className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${
                sortOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {sortOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setSortOpen(false)}
                aria-hidden="true"
              />
              <ul
                className="absolute right-0 z-20 mt-1 min-w-[140px] rounded-lg border border-zinc-800 bg-[#15181f] py-1 shadow-lg"
                role="listbox"
              >
                {(["duration", "calories", "rating"] as SortOption[]).map(
                  (opt) => (
                    <li
                      key={opt}
                      role="option"
                      aria-selected={sortBy === opt}
                      onClick={() => {
                        setSortBy(opt);
                        setSortOpen(false);
                      }}
                      className={`px-3 py-2 text-xs transition-colors ${
                        sortBy === opt
                          ? "bg-[#252a34] text-[#baff00]"
                          : "text-zinc-300 hover:bg-zinc-800"
                      }`}
                    >
                      {SORT_LABELS[opt]}
                    </li>
                  )
                )}
              </ul>
            </>
          )}
        </div>
      </div>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-zinc-800 bg-[#15181f] px-6 py-12 text-center">
            <p className="text-lg font-black text-zinc-400">No workouts found</p>
            <p className="mt-2 text-sm text-zinc-500">
              Try a different search term.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}