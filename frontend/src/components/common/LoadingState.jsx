import { Loader2 } from "lucide-react";

const LoadingState = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex min-h-[240px] items-center justify-center">
      <div className="flex flex-col items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
          <Loader2
            size={20}
            className="animate-spin"
          />
        </div>

        <p className="text-sm text-slate-500">
          {message}
        </p>

      </div>
    </div>
  );
};

export default LoadingState;