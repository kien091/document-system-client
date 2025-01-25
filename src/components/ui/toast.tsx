import { X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  isOpen: boolean;
  onClose: () => void;
}

export function Toast({
  message,
  type = "success",
  isOpen,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
          type === "success"
            ? "bg-green-50 text-green-600"
            : "bg-red-50 text-red-600"
        }`}
      >
        <span className="text-sm">{message}</span>
        <button
          onClick={onClose}
          className="p-0.5 hover:bg-white/20 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
