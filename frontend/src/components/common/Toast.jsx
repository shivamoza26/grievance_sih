import {
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  AlertCircle,
} from "lucide-react";

const Toast = ({
  message,
  type = "success",
  onClose,
}) => {
  const config = {
    success: {
      icon: CheckCircle2,
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-800",
      iconClass: "text-emerald-600",
    },

    error: {
      icon: AlertCircle,
      className:
        "border-red-200 bg-red-50 text-red-800",
      iconClass: "text-red-600",
    },

    warning: {
      icon: AlertTriangle,
      className:
        "border-amber-200 bg-amber-50 text-amber-800",
      iconClass: "text-amber-600",
    },

    info: {
      icon: Info,
      className:
        "border-blue-200 bg-blue-50 text-blue-800",
      iconClass: "text-blue-600",
    },
  };

  const current = config[type] || config.info;
  const Icon = current.icon;

  return (
    <div
      className={`
        w-[calc(100vw-2rem)]
        sm:w-[380px]
        rounded-xl
        border
        shadow-lg
        px-4
        py-3
        flex
        items-start
        gap-3
        animate-in
        slide-in-from-right-4
        duration-200
        ${current.className}
      `}
      role="alert"
    >
      <Icon
        size={20}
        className={`mt-0.5 shrink-0 ${current.iconClass}`}
      />

      <p className="flex-1 text-sm font-medium leading-5">
        {message}
      </p>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="shrink-0 rounded-md p-1 opacity-60 hover:bg-black/5 hover:opacity-100 transition"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;