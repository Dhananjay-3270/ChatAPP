import { cn } from "../../utils/cn";

interface InputSearchProps {
  variant: "default" | "filled" | "outlined" | "ghost";
  size: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  width?: "sm" | "md" | "lg" | "full";
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  isLoading?: boolean;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconSize?: "sm" | "md" | "lg";
  label?: string;
}
const baseStyles =
  "w-full  focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const radiusStyles = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};
const variantStyles = {
  default:
    "border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500",
  filled:
    "bg-gray-100 border border-transparent text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400",
  outlined:
    "border border-gray-300 bg-transparent text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500",
  ghost:
    "bg-transparent border-0 border-b border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-0 focus:border-blue-500 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500",
  error:
    "border border-red-500 bg-white text-red-700 placeholder-red-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-red-400 dark:placeholder-red-500",
};

const sizeStyles = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-5 py-3 text-lg",
};

const iconSizeStyles = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const widthStyles = {
  sm: "w-32",
  md: "w-64",
  lg: "w-96",
  full: "w-full",
};

export const InputSearch: React.FC<InputSearchProps> = (props) => {
  const {
    width = "full",
    leftIcon,
    rightIcon,
    iconSize = "sm",
    variant = "default",
    size = "md",
    borderRadius = "lg",
    label,
    error = false,
    errorMessage,
    placeholder,
    value,
    disabled = false,
    readonly = false,
    onChange,
    ...inputProps
  } = props;

  // Generate unique ID for accessibility
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  const containerSize = widthStyles[width];
  const iconSizeStyle = iconSizeStyles[iconSize];

  // Input classes with icon padding
  const inputClasses = cn(
    baseStyles,
    radiusStyles[borderRadius || "lg"], // default to l
    variantStyles[error ? "error" : variant],
    sizeStyles[size],
    leftIcon ? "pl-10" : "",
    rightIcon ? "pr-10" : "",
  );

  return (
    <div className={containerSize}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
        </label>
      )}

      {/* Input Container with relative positioning */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div
            className={cn(
              "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 cursor-pointer   ",
            )}
          >
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        <input
          id={inputId}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          readOnly={readonly}
          onChange={onChange}
          {...inputProps}
        />

        {/* Right Icon */}
        {rightIcon && (
          <div
            className={cn(
              "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none",
              iconSizeStyle,
            )}
          >
            {rightIcon}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
