const StatusBadge = ({ status }) => {
  const styles = {
    PENDING: {
      label: "Pending",
      className:
        "bg-[#F5EEDF] text-[#8A642F] border-[#E5D5B8]",
    },

    IN_PROGRESS: {
      label: "In Progress",
      className:
        "bg-[#E4F0EB] text-[#587F73] border-[#C4DED4]",
    },

    RESOLVED: {
      label: "Resolved",
      className:
        "bg-[#DCEBE5] text-[#4B6D63] border-[#BBD7CC]",
    },

    REJECTED: {
      label: "Rejected",
      className:
        "bg-[#F7E8E8] text-[#A34F4F] border-[#E8CACA]",
    },

    CLOSED: {
      label: "Closed",
      className:
        "bg-[#EEF1EF] text-[#626A67] border-[#D9DEDB]",
    },
  };

  const normalizedStatus = status?.toUpperCase();

  const config =
    styles[normalizedStatus] || {
      label: status || "Unknown",
      className:
        "bg-[#EEF1EF] text-[#626A67] border-[#D9DEDB]",
    };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        px-2.5
        py-1
        rounded-full
        border
        text-xs
        font-semibold
        whitespace-nowrap
        ${config.className}
      `}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />

      {config.label}
    </span>
  );
};

export default StatusBadge;