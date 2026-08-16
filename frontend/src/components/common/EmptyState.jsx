import { FileSearch } from "lucide-react";

const EmptyState = ({
  title = "Nothing here yet",
  message = "There are no records to display.",
  action,
}) => {
  return (
    <div className="flex min-h-[280px] items-center justify-center">
      <div className="max-w-sm text-center">

        <div className="mx-auto w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
          <FileSearch size={22} />
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {message}
        </p>

        {action && (
          <div className="mt-5">
            {action}
          </div>
        )}

      </div>
    </div>
  );
};

export default EmptyState;