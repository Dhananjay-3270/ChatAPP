import type React from "react";
import { cn } from "../../utils/cn";
interface CardProps {
  variant?: "default" | "elevated" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = (props) => {
  const {
    variant = "default",
    size = "md",
    hoverable = false,
    clickable = false,
    className = "",
    children,
  } = props;

  const baseStyles =
    "block rounded-lg transition-all duration-200 overflow-hidden";
  const variantStyles = {
    default:
      "bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700",
    elevated:
      "bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/20",
    outline:
      "border-2 border-gray-300 bg-transparent hover:border-gray-400 transition-colors dark:border-gray-600 dark:hover:border-gray-500",
    ghost:
      "bg-gray-50 border-0 hover:bg-gray-100 transition-colors dark:bg-gray-900 dark:hover:bg-gray-800",
  };
  const sizeStyles = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };
  const combinedClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );
  return (
    <div
      className={`card ${hoverable ? "hoverable" : ""} ${
        clickable ? "clickable" : ""
      }${combinedClasses}`}
    >
      {children}
    </div>
  );
};

export default Card;
