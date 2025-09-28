
import type React from "react";
interface CardHeaderProps {
  title: string;
  subtitle?: string;

  children?: React.ReactNode;

  // Actions & Icons
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  // Layout
  alignment?: "left" | "center" | "right";
  divider?: boolean;

  // Styling
  className?: string;
}
const CardHeader: React.FC<CardHeaderProps> = (props) => {
  const { children, alignment, icon ,title } = props;

  return (
    <div className={`card-header ${alignment ? alignment : ""}`}>
      <div className="header-content">
        <div className="header-main flex gap-4.5 ">
          {icon && <div className="header-icon">{icon}</div>}
          <div className="font-medium">{title}</div>
        </div>
      </div>
      {children}
    </div>
  );
};
export default CardHeader;
