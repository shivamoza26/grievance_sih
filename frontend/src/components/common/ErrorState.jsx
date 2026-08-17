import { AlertTriangle, RefreshCw } from "lucide-react";

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load this information. Please try again.",
  onRetry,
}) => {
  return (
    <div className="flex min-h-[280px] items-center justify-center">
      <div className="max-w-sm text-center">

        <div className="mx-auto w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
          <AlertTriangle size={22} />
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition"
          >
            <RefreshCw size={15} />
            Try again
          </button>
        )}

      </div>
    </div>
  );
};

export default ErrorState;