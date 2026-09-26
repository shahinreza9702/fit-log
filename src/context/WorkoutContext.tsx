"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { IWorkout } from "@/types/WorkoutTypes";
import { toast } from "@/components/ui/Toast";

export interface PlanWorkout extends IWorkout {
  isDone?: boolean;
}

interface WorkoutContextType {
  plan: PlanWorkout[];
  saved: IWorkout[];
  addToPlan: (workout: IWorkout) => void;
  saveForLater: (workout: IWorkout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  clearPlan: () => void;
  planCount: number;
  savedCount: number;
  planFull: boolean;
  totalMinutes: number;
  totalCalories: number;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

const STORAGE_KEY_PLAN = "fitlog-plan";
const STORAGE_KEY_SAVED = "fitlog-saved";
const PLAN_CAP = 5;

function readFromStorage<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanWorkout[]>(() =>
    readFromStorage<PlanWorkout>(STORAGE_KEY_PLAN)
  );
  const [saved, setSaved] = useState<IWorkout[]>(() =>
    readFromStorage<IWorkout>(STORAGE_KEY_SAVED)
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout: IWorkout) => {
    if (plan.length >= PLAN_CAP) {
      toast("Plan is full (max 5 lifts). Finish or remove some first.");
      return;
    }
    if (plan.some((w) => w.id === workout.id)) {
      toast("Already in today's plan");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast("Added to today's plan");
  };

  const saveForLater = (workout: IWorkout) => {
    if (saved.some((w) => w.id === workout.id)) {
      toast("Already saved");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast("Saved for later");
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    toast("Removed from plan");
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    toast("Removed from saved");
  };

  const markAsDone = (id: number) => {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isDone: true } : w))
    );
    toast("Marked as done");
  };

  const clearPlan = () => {
    setPlan([]);
  };

  const planCount = plan.length;
  const savedCount = saved.length;
  const planFull = plan.length >= PLAN_CAP;
  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

return (
      <WorkoutContext.Provider
        value={{
          plan,
          saved,
          addToPlan,
          saveForLater,
          removeFromPlan,
          removeFromSaved,
          markAsDone,
          clearPlan,
          planCount,
          savedCount,
          planFull,
          totalMinutes,
          totalCalories,
        }}
      >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}