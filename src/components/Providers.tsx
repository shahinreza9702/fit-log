"use client";

import React, { ReactNode } from "react";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { ToastProvider } from "@/components/ui/Toast";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WorkoutProvider>
      <ToastProvider>{children}</ToastProvider>
    </WorkoutProvider>
  );
}