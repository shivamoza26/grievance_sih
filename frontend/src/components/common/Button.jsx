import {
  Loader2,
} from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon,
  className = "",
  type = "button",
  onClick,
}) => {
  const variants = {
    primary:
      "bg-[#312F2C] !text-white hover:bg-[#211F1D] shadow-sm",

    secondary:
      "bg-white !text-[#312F2C] border border-[#C8D2CE] hover:bg-[#F4F7F5]",

    ghost:
      "!text-[#626A67] hover:bg-[#EDF2EF] hover:!text-[#312F2C]",

    danger:
      "bg-[#A34F4F] !text-white hover:bg-[#8F4141] shadow-sm",

    success:
      "bg-[#587F73] !text-white hover:bg-[#4B6D63] shadow-sm",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-sm",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-lg
        font-medium
        transition-all
        duration-200
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#587F73]
        focus-visible:ring-offset-2
        disabled:opacity-50
        disabled:pointer-events-none
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
    >
      {loading ? (
        <Loader2
          size={16}
          className="animate-spin"
        />
      ) : (
        Icon && <Icon size={16} />
      )}

      {children}
    </button>
  );
};

export default Button;