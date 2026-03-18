import { createContext, useCallback, useContext, useEffect, useState } from "react";

type ToastType = "success" | "error" | "warning";

type Toast = {
    id: number;
    message: string;
    type: ToastType;
};

type ToastContextValue = {
    toast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export const useToast = () => useContext(ToastContext);

let nextId = 0;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((message: string, type: ToastType = "success") => {
        const id = nextId++;
        setToasts((prev) => [...prev, { id, message, type }]);
    }, []);

    const dismiss = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext value={{ toast }}>
            {children}
            <div className="fixed bottom-4 right-4 md:right-6 left-4 md:left-auto md:w-80 z-50 space-y-2">
                {toasts.map((t) => (
                    <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
                ))}
            </div>
        </ToastContext>
    );
};

const typeStyles: Record<ToastType, string> = {
    success: "bg-highlight text-white",
    error: "bg-red-600 text-white",
    warning: "bg-star text-text-primary",
};

const ToastItem = ({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => onDismiss(toast.id), 4500);
        return () => clearTimeout(timer);
    }, [toast.id, onDismiss]);

    return (
        <div
            role="alert"
            className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center justify-between gap-3 animate-[slideUp_0.2s_ease-out] ${typeStyles[toast.type]}`}
        >
            <span>{toast.message}</span>
            <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                className="opacity-70 hover:opacity-100 transition-opacity shrink-0"
                aria-label="dismiss"
            >
                ✕
            </button>
        </div>
    );
};
