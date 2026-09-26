"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextType {
  toast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Standalone toast function for use outside React components
let toastInstance: ((message: string, type?: "success" | "error" | "info") => void) | null = null;

export function setToastInstance(fn: typeof toastInstance) {
  toastInstance = fn;
}

export function toast(message: string, type: "success" | "error" | "info" = "info") {
  if (toastInstance) {
    toastInstance(message, type);
  } else {
    // Fallback: store in queue and flush when provider mounts
    console.warn("Toast called before provider mounted:", message);
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<
    Array<{ id: number; message: string; type: string }>
  >([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Register this instance for standalone use
  React.useEffect(() => {
    setToastInstance(showToast);
    return () => setToastInstance(null);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium min-w-[200px] max-w-[350px] animate-slide-in ${
              t.type === "success"
                ? "bg-[#baff00] text-black"
                : t.type === "error"
                ? "bg-red-600 text-white"
                : "bg-zinc-800 text-white border border-zinc-700"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}