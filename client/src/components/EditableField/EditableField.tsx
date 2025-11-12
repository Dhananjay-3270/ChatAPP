import { useState } from "react";
import { Edit2, Check, X } from "lucide-react";
import { cn } from "../../utils/cn";

interface EditableFieldProps {
  value: string; // current value
  onSave: (newValue: string) => void; // callback on save
  onCancel?: () => void; // optional cancel handler
  placeholder?: string; // placeholder when empty
  variant?: "text" | "textarea"; // single-line or multiline
  size?: "sm" | "md" | "lg"; // text sizing
  disabled?: boolean; // disable editing
  className?: string; // for styling overrides
}

const EditableField: React.FC<EditableFieldProps> = (props) => {
  const {
    value,
    onSave,
    onCancel,
    placeholder = "Enter text...",
    variant = "text",
    size = "md",
    disabled = false,
    className = "",
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    if (inputValue.trim() !== "") {
      onSave(inputValue.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setInputValue(value); // Reset to original value
    setIsEditing(false);
    onCancel?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && variant === "text") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  // Size styles
  const sizeStyles = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-3 py-1.5",
    lg: "text-lg px-4 py-2",
  };

  // Input styles based on variant
  const inputClasses = cn(
    "border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-400",
    "transition-colors duration-200",
    sizeStyles[size],
    variant === "textarea" ? "resize-none min-h-[60px]" : "",
    className
  );

  // Display text styles
  const displayClasses = cn(
    "inline-flex items-center gap-2 group transition-colors duration-200",
    "hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md",
    sizeStyles[size],
    disabled && "opacity-50 cursor-not-allowed"
  );

  // Button styles
  const buttonClasses =
    "p-1 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700";

  return (
    <div className={cn("w-full", className)}>
      {!isEditing ? (
        // Display Mode
        <div className={displayClasses}>
          <span
            className={cn(
              "flex-1 min-w-0",
              !value && "text-gray-500 dark:text-gray-400 italic"
            )}
          >
            {value || placeholder}
          </span>
          {!disabled && (
            <button
              onClick={() => setIsEditing(true)}
              className={cn(
                buttonClasses,
                "opacity-0 group-hover:opacity-100 text-gray-600 hover:text-gray-800",
                "dark:text-gray-400 dark:hover:text-gray-200"
              )}
              title="Edit"
            >
              <Edit2 size={14} />
            </button>
          )}
        </div>
      ) : (
        // Edit Mode
        <div className="flex items-start gap-2 w-full">
          {variant === "textarea" ? (
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(inputClasses, "flex-1")}
              autoFocus
              rows={3}
            />
          ) : (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(inputClasses, "flex-1")}
              autoFocus
            />
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-1 mt-1">
            <button
              onClick={handleSave}
              disabled={!inputValue.trim()}
              className={cn(
                buttonClasses,
                "text-green-600 hover:text-green-700 hover:bg-green-50",
                "dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              title="Save"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleCancel}
              className={cn(
                buttonClasses,
                "text-red-600 hover:text-red-700 hover:bg-red-50",
                "dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
              )}
              title="Cancel"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableField;
