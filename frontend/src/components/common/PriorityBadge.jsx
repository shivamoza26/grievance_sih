const PriorityBadge = ({ priority }) => {
  const styles = {
    HIGH: {
      label: "High",
      className:
        "bg-[#F7E8E8] text-[#A34F4F] border-[#E8CACA]",
    },

    MEDIUM: {
      label: "Medium",
      className:
        "bg-[#F5EEDF] text-[#8A642F] border-[#E5D5B8]",
    },

    LOW: {
      label: "Low",
      className:
        "bg-[#E4F0EB] text-[#587F73] border-[#C4DED4]",
    },
  };

  const config =
    styles[priority] || {
      label: priority || "Unknown",
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

export default PriorityBadge;