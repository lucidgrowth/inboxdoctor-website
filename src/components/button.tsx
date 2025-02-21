// components/Button.tsx
import type React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant = "primary",
}) => {
  const baseStyles =
    "font-bold py-2 px-4 rounded transition-colors duration-200";
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary:
      "bg-transparent border border-white/20 text-white hover:bg-white/10",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

// Example usage:
// <Button variant="secondary">Start 7 Days Free Trial</Button>
