const Card = ({
  children,
  className = "",
  padding = true,
  hover = false,
}) => {
  return (
    <div
      className={`
        bg-white
        border border-[#DDE3E0]
        rounded-xl
        shadow-sm
        ${padding ? "p-6" : ""}
        ${
          hover
            ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#A1C6B9]"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;