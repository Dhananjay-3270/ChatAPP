import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../utils/cn";
import { ChevronDown } from "lucide-react";

interface DropDownOption {
  value: string;
  label: string;
}

interface DropDownProps {
  options: DropDownOption[];
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  //visuals
  label?: string;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  width?: "auto" | "full" | "sm" | "md" | "lg" | "xl";
  className?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const DropDown: React.FC<DropDownProps> = (props) => {
  const {
    options,
    fullWidth = false,
    value,
    onChange,
    placeholder = "Select an option",
    variant = "outline",
    size = "sm",
    className = "",
    width = "sm",
    disabled = false,
    error = false,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  // Get selected option label
  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const baseStyles = cn("relative inline-block", fullWidth ? "w-full" : "");

  const triggerBaseStyles = cn(
    "inline-flex items-center justify-between font-medium rounded-lg transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed text-left select-none cursor-pointer",
    error && "border-red-500 focus:ring-red-500"
  );

  const variantStyles = {
    primary:
      "bg-black text-white hover:bg-gray-800 focus:ring-gray-500 " +
      "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500",

    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 " +
      "dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",

    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 " +
      "focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:bg-gray-900",

    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 " +
      "dark:text-gray-300 dark:hover:bg-gray-800",

    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 " +
      "dark:bg-red-500 dark:hover:bg-red-600",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const widthStyles = {
    auto: "w-auto",
    full: "w-full",
    sm: "w-24",
    md: "w-48",
    lg: "w-64",
    xl: "w-80",
  };

  const triggerClasses = cn(
    triggerBaseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : widthStyles[width],
    disabled && "cursor-not-allowed",
    className
  );

  const dropdownClasses = cn(
    "absolute z-50 mt-1 rounded-md border border-gray-300 bg-white shadow-lg",
    "dark:border-gray-600 dark:bg-gray-800",
    "overflow-y-auto max-h-24",
    fullWidth ? "w-full" : widthStyles[width],
    !fullWidth && width === "sm" && "min-w-24"
  );

  const optionClasses = cn(
    "block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer",
    "dark:text-gray-300 dark:hover:bg-gray-700",
    "first:rounded-t-md last:rounded-b-md"
  );

  return (
    <div className={baseStyles} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        className={triggerClasses}
        onClick={toggleDropdown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={cn(!selectedOption && "text-gray-500")}>
          {displayText}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={dropdownClasses} role="listbox">
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                optionClasses,
                value === option.value &&
                  "bg-gray-100 dark:bg-gray-700 font-medium"
              )}
              onClick={() => handleOptionSelect(option.value)}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
