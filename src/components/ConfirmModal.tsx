"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmVariant?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  confirmVariant = "danger",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onCancel]);

  // Prevent body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-surface rounded-2xl border border-border shadow-lg p-6 w-full max-w-sm"
          >
            <h3 className="text-[16px] font-semibold text-text-primary mb-2">
              {title}
            </h3>
            <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
              {message}
            </p>

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 min-h-[44px] px-4 py-2.5 text-[14px] font-medium
                  bg-surface text-text-primary rounded-lg border border-border
                  hover:bg-surface-secondary active:bg-surface-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 min-h-[44px] px-4 py-2.5 text-[14px] font-medium rounded-lg transition-colors ${
                  confirmVariant === "danger"
                    ? "bg-danger text-white hover:bg-red-700 active:bg-red-700"
                    : "bg-primary text-white hover:bg-primary-hover active:bg-primary-hover"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
