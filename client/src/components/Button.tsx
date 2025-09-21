import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

interface BaseButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Button as actual button
interface ButtonAsButton
  extends BaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  as?: "button";
  to?: never;
  href?: never;
}

// Button as React Router Link
interface ButtonAsRouterLink
  extends BaseButtonProps,
    Omit<React.ComponentProps<typeof Link>, keyof BaseButtonProps> {
  as: "link";
  to: string;
  href?: never;
}

// Button as external link (anchor)
interface ButtonAsAnchor
  extends BaseButtonProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  as: "anchor";
  href: string;
  to?: never;
}

export type ButtonProps = ButtonAsButton | ButtonAsRouterLink | ButtonAsAnchor;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className,
    children,
    ...restProps
  } = props;

  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-center no-underline";

  // Variant styles
  const variantStyles = {
    primary:
      "bg-black text-white hover:bg-gray-800 focus:ring-gray-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    outline:
      "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  // Full width style
  const widthStyle = fullWidth ? "w-full" : "";

  // Combine all classes
  const combinedClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    widthStyle,
    className
  );

  // Content with icons and loading
  const content = (
    <>
      {/* Loading spinner */}
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Left icon */}
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}

      {/* Button text */}
      <span>{children}</span>

      {/* Right icon */}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  // Handle disabled state for links
  const isDisabled =
    props.as === "button"
      ? (restProps as ButtonAsButton).disabled || isLoading
      : isLoading;

  // Render as React Router Link
  if (props.as === "link") {
    const { to, ...linkProps } = restProps as Omit<
      ButtonAsRouterLink,
      keyof BaseButtonProps
    >;
    return (
      <Link
        to={isDisabled ? "#" : to}
        className={cn(combinedClasses, isDisabled && "pointer-events-none")}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  // Render as external anchor link
  if (props.as === "anchor") {
    const { href, ...anchorProps } = restProps as Omit<
      ButtonAsAnchor,
      keyof BaseButtonProps
    >;
    return (
      <a
        href={isDisabled ? "#" : href}
        className={cn(combinedClasses, isDisabled && "pointer-events-none")}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  // Default: render as button
  const { disabled, ...buttonProps } = restProps as Omit<
    ButtonAsButton,
    keyof BaseButtonProps
  >;
  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...buttonProps}
    >
      {content}
    </button>
  );
};

export default Button;
