import { Loader2 } from 'lucide-react';
import React from 'react'

interface IButtonProps {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "normal" | "secondary" | "outline" | "ghost" | "link" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

const defaultClasses = `flex items-center justify-center gap-2 
border border-gray-300 px-4 py-2
cursor-pointer
rounded-md text-sm font-medium 
transition-colors focus-visible:outline-none 
focus-visible:ring-1 focus-visible:ring-ring 
disabled:pointer-events-none disabled:opacity-50`;
const variantClasses = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-blue-600 text-white",
  normal: "bg-white-400 border border-gray-300 text-black",
  outline: "bg-white text-gray-600 border-gray-300",
  ghost: "bg-transparent text-gray-600",
  link: "bg-transparent text-blue-600",
  danger: "bg-red-500 text-white",
}

const Button = (props: IButtonProps) => {
  const { text, children, onClick, className, type, disabled, loading, variant, size, icon } = props;
  return (
    <button
      onClick={onClick}
      className={`${defaultClasses} 
                ${variantClasses[variant as keyof typeof variantClasses]} 
                ${loading ? "cursor-not-allowed" : ""}
                ${className}`}
      type={type}
      disabled={disabled || loading}
    >
      {loading && <Loader2 className="animate-spin h-4 w-4 cursor-not-allowed" />}

      <span
        className={loading ? "opacity-80" : "flex gap-0.5 items-center"}
      >
        {text ?? children}
      </span>
    </button>
  )
}

export default Button