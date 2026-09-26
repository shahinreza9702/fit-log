"use client";

import React from "react";
import { CalendarPlus, Bookmark } from "lucide-react";
import { IWorkout } from "@/types/WorkoutTypes";
import { useWorkout } from "@/context/WorkoutContext";

interface WorkoutActionsProps {
  workout: IWorkout;
}

export function WorkoutActions({ workout }: WorkoutActionsProps) {
  const { addToPlan, saveForLater, planFull, plan } = useWorkout();
  const alreadyInPlan = plan.some((w) => w.id === workout.id);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={planFull || alreadyInPlan}
        title={
          planFull
            ? "Plan is full (max 5 lifts)"
            : alreadyInPlan
            ? "Already in today's plan"
            : undefined
        }
        className={`inline-flex h-12 items-center justify-center gap-2 rounded-[9px] px-6 text-sm font-semibold transition ${
          planFull || alreadyInPlan
            ? "cursor-not-allowed bg-zinc-700 text-zinc-500"
            : "bg-[#baff00] text-black hover:bg-[#c7ff33]"
        }`}
      >
        <CalendarPlus className="h-4 w-4" />
        {planFull ? "Plan is full" : alreadyInPlan ? "Already in plan" : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={() => saveForLater(workout)}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-[9px] border border-zinc-700 px-6 text-sm font-medium text-zinc-200 transition hover:bg-zinc-900"
      >
        <Bookmark className="h-4 w-4" />
        Save for later
      </button>
    </div>
  );
}