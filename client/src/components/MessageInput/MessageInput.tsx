import type React from "react";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { Smile, Send } from "lucide-react";

interface MessageInputProps {
  variant: "default" | "filled" | "outlined" | "ghost";
  size: "sm" | "md" | "lg";
  width?: "sm" | "md" | "lg" | "full";
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMessageSend?: (e: React.MouseEvent<SVGSVGElement>) => void;
  iconSize?: "sm" | "md" | "lg";
  label?: string;
  value?: string;
}

export const MessageInput: React.FC<MessageInputProps> = (props) => {
  const {
    width = "full",
    variant = "default",
    size = "md",
    borderRadius = "lg",
    onChange,
    value,
    placeholder = "Type a message...",
    iconSize = "md",
    handleMessageSend,
  } = props;

  // Container styles
  const containerBaseStyles =
    "relative flex items-center gap-2 transition-all duration-200";

  // Input styles
  const inputBaseStyles =
    "flex-1 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

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
  };

  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const widthStyles = {
    sm: "w-32",
    md: "w-64",
    lg: "w-96",
    full: "w-full",
  };

  const iconSizeStyles = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const containerClasses = cn(
    containerBaseStyles,
    widthStyles[width],
    radiusStyles[borderRadius],
    variantStyles[variant],
    sizeStyles[size],
  );

  const inputClasses = cn(
    inputBaseStyles,
    "bg-transparent border-none focus:ring-0",
  );

  const iconClasses = cn(
    iconSizeStyles[iconSize],
    "cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200",
  );

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div className={containerClasses}>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
      />
      <Smile
        className={iconClasses}
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      />
      <Send className={iconClasses} onClick={handleMessageSend} />
    </div>
  );
};
