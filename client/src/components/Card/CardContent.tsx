import type React from "react";
interface CardContentProps {
  description?: string;

  children?: React.ReactNode;

  // Actions & Icons
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  // Layout
  alignment?: "left" | "center" | "right";

  // Styling
  className?: string;
}
const CardContent: React.FC<CardContentProps> = (props) => {
  const { children, alignment = "left", description, className = "" } = props;

  // Alignment styles for the content container
  const alignmentStyles = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div
      className={`card-content flex flex-col mt-4 ${alignmentStyles[alignment]} ${className}`}
    >
      {description && (
        <div className="content-description mb-2">
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      )}
      <div className={`content-children ${alignmentStyles[alignment]}`}>
        {children}
      </div>
    </div>
  );
};
export default CardContent;
