import { createContext, useContext } from "react";

type ToastContextType = {
  showToast: (
    message: string,
    severity?: "success" | "info" | "warn" | "error"
  ) => void;
};

// Create Context for Toast
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

// Hook to use Toast in child components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
