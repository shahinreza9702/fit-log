"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWorkout, PlanWorkout } from "@/context/WorkoutContext";
import { Clock3, Flame, Star, Check, X, ChevronDown } from "lucide-react";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

const SORT_LABELS: Record<SortOption, string> = {
  duration: "Duration",
  calories: "Calories",
  rating: "Rating",
};

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    totalMinutes,
    totalCalories,
  } = useWorkout();
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [sortOpen, setSortOpen] = useState(false);

  const currentList: PlanWorkout[] =
    activeTab === "plan" ? plan : saved;

  const sortedList = useMemo(() => {
    return [...currentList].sort((a, b) => {
      let valA: number;
      let valB: number;
      switch (sortBy) {
        case "duration":
          valA = a.duration;
          valB = b.duration;
          break;
        case "calories":
          valA = a.caloriesBurned;
          valB = b.caloriesBurned;
          break;
        case "rating":
          valA = a.rating;
          valB = b.rating;
          break;
      }
      return valA - valB;
    });
  }, [currentList, sortBy]);

  const handleRemove = (id: number) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
  };

  const handleMarkDone = (id: number) => {
    markAsDone(id);
  };

  if (!currentList.length) {
    return (
      <div className="min-h-screen bg-black px-4 py-10 text-white">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tight">
            MY PLAN
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Summary */}
        <div className="mb-7 rounded-2xl border border-zinc-800 bg-[#15181f] px-6 py-7">
          <div className="grid grid-cols-3">
            <div className="border-r border-zinc-800">
              <p className="text-xs text-zinc-500">Exercises</p>
              <p className="mt-1 text-4xl font-black text-[#baff00]">0</p>
            </div>
            <div className="border-r border-zinc-800 px-8">
              <p className="text-xs text-zinc-500">Minutes</p>
              <p className="mt-1 text-4xl font-black">0</p>
            </div>
            <div className="px-8">
              <p className="text-xs text-zinc-500">Calories</p>
              <p className="mt-1 text-4xl font-black">0</p>
            </div>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex rounded-lg border border-zinc-800 bg-[#15181f] p-1">
            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-md px-5 py-2 text-xs font-semibold transition-colors ${
                activeTab === "plan"
                  ? "bg-[#252a34] text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
Today&apos;s Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-5 py-2 text-xs font-semibold transition-colors ${
                activeTab === "saved"
                  ? "bg-[#252a34] text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="rounded-2xl border border-zinc-800 bg-[#15181f] px-6 py-12 text-center">
          <p className="text-lg font-black text-zinc-400">NOTHING HERE YET</p>
          <p className="mt-2 text-sm text-zinc-500 max-w-md mx-auto">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#baff00] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#c7ff33]"
          >
            Go to workouts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight">
          MY PLAN
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary */}
      <div className="mb-7 rounded-2xl border border-zinc-800 bg-[#15181f] px-6 py-7">
        <div className="grid grid-cols-3">
          <div className="border-r border-zinc-800">
            <p className="text-xs text-zinc-500">Exercises</p>
            <p className="mt-1 text-4xl font-black text-[#baff00]">
              {plan.length}
            </p>
          </div>
          <div className="border-r border-zinc-800 px-8">
            <p className="text-xs text-zinc-500">Minutes</p>
            <p className="mt-1 text-4xl font-black">{totalMinutes}</p>
          </div>
          <div className="px-8">
            <p className="text-xs text-zinc-500">Calories</p>
            <p className="mt-1 text-4xl font-black">{totalCalories}</p>
          </div>
        </div>
      </div>

      {/* Tabs + Sort */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex rounded-lg border border-zinc-800 bg-[#15181f] p-1">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-md px-5 py-2 text-xs font-semibold transition-colors ${
              activeTab === "plan"
                ? "bg-[#252a34] text-white"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-md px-5 py-2 text-xs font-semibold transition-colors ${
              activeTab === "saved"
                ? "bg-[#252a34] text-white"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="relative flex items-center gap-3">
          <span className="text-xs text-zinc-400">Sort By</span>
          <div className="relative">
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
                  {(["duration", "calories", "rating"] as SortOption[]).map((opt) => (
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
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Workout List */}
      <div className="space-y-4">
        {sortedList.map((exercise) => (
          <div
            key={exercise.id}
            className="flex items-center rounded-2xl border border-zinc-800 bg-[#15181f] p-4"
          >
            {/* Image */}
            <Link href={`/workout/${exercise.id}`}>
              <Image
                src={exercise.image}
                alt={exercise.name}
                width={144}
                height={80}
                className="h-20 w-36 shrink-0 rounded-xl object-cover"
              />
            </Link>

            {/* Exercise Info */}
            <div className="ml-4 min-w-0 flex-1">
              <Link href={`/workout/${exercise.id}`} className="block">
                <h2 className="text-base font-black uppercase truncate">
                  {exercise.name}
                </h2>
              </Link>

              <p className="mt-1 text-xs text-zinc-500 truncate">
                {exercise.equipment}
              </p>

              <div className="mt-2 flex items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5 text-[#baff00]" />
                  {exercise.duration} min
                </span>

                <span className="flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 fill-[#baff00] text-[#baff00]" />
                  {exercise.caloriesBurned} kcal
                </span>

                <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-[#baff00] text-[#baff00]" />
                  {exercise.rating}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="ml-6 flex items-center gap-3">
              <Link
                href={`/workout/${exercise.id}`}
                className="rounded-full border border-zinc-700 px-5 py-2 text-xs font-medium text-zinc-200 transition hover:border-zinc-500"
              >
                View Details
              </Link>

              {activeTab === "plan" && (
                <>
                  <button
                    onClick={() => handleMarkDone(exercise.id)}
                    disabled={exercise.isDone}
                    className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition ${
                      exercise.isDone
                        ? "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                        : "bg-[#baff00] text-black hover:bg-[#c5ff33]"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                    {exercise.isDone ? "Done" : "Mark as Done"}
                  </button>
                  <button
                    onClick={() => handleRemove(exercise.id)}
                    className="p-2 text-zinc-600 transition hover:text-white"
                    aria-label="Remove from plan"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              )}

              {activeTab === "saved" && (
                <button
                  onClick={() => handleRemove(exercise.id)}
                  className="p-2 text-zinc-600 transition hover:text-white"
                  aria-label="Remove from saved"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}