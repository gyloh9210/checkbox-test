import { useRef } from "react";
import { Toast } from "primereact/toast";
import { ToastContext } from "../context/ToastContext";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toastRef = useRef<Toast>(null);

  // Function to show toast
  const showToast = (
    message: string,
    severity: "success" | "info" | "warn" | "error" = "info"
  ) => {
    toastRef.current?.show({
      severity,
      detail: message,
      life: 3000,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};
