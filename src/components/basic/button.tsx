import { Loader2 } from "lucide-react";
import React from "react";

interface IButtonProps {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  variant?:
    | "primary"
    | "normal"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

const defaultClasses = `flex items-center justify-center gap-2 
border border-gray-300
cursor-pointer
rounded-md text-sm font-medium 
transition-colors focus-visible:outline-none 
focus-visible:ring-1 focus-visible:ring-ring 
disabled:pointer-events-none disabled:opacity-50


 /* ✅ responsive padding */
  py-2 px-1.5
  sm:py-2.5 sm:px-3
  md:py-3 md:px-3.5

  /* ✅ responsive text size */
  text-sm
  sm:text-sm
  md:text-md
`;
const variantClasses = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-blue-600 text-white",
  normal: "bg-white-400 border border-gray-300 text-black",
  outline: "bg-white text-gray-600 border-gray-300",
  ghost: "bg-transparent text-gray-600",
  link: "bg-transparent text-blue-600",
  danger: "bg-red-500 text-white",
};

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-md",
};

const Button = (props: IButtonProps) => {
  const {
    text,
    children,
    onClick,
    className,
    type,
    disabled,
    loading,
    variant,
    size,
    icon,
  } = props;
  return (
    <button
      onClick={onClick}
      className={`${defaultClasses} 
                ${variantClasses[variant as keyof typeof variantClasses]} 
                ${sizeClasses[size as keyof typeof sizeClasses]}
                ${loading ? "cursor-not-allowed" : ""}
                ${className}`}
      type={type}
      disabled={disabled || loading}
    >
      {/* {loading && (
        <Loader2 className="animate-spin h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 cursor-not-allowed" />
      )} */}

      <div
        className={`flex gap-1 items-center justify-center ${
          loading ? "opacity-60" : ""
        }`}
      >
        {loading ? (
          <Loader2 className="animate-spin h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 cursor-not-allowed" />
        ) : icon ? (
          icon
        ) : null}
        {text ? <span>{text}</span> : children}
      </div>
    </button>
  );
};

export default Button;
