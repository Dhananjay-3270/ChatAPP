import React from "react";
import { cn } from "../utils/cn";

interface ProfileAvatarProps {
  /** User's name for generating initials */
  name: string;
  /** Optional profile image URL */
  src?: string;
  /** Avatar size */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Online status indicator */
  status?: "online" | "offline" | "away" | "busy";
  /** Show status indicator */
  showStatus?: boolean;
  /** Custom className for styling */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  name,
  src,
  size = "md",
  status = "offline",
  showStatus = false,
  className = "",
  onClick,
}) => {
  // Generate initials from name
  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Size configurations
  const sizeConfig = {
    xs: {
      container: "w-6 h-6",
      text: "text-xs",
      status: "w-2 h-2 bottom-0 right-0",
    },
    sm: {
      container: "w-8 h-8",
      text: "text-sm",
      status: "w-2.5 h-2.5 bottom-0 right-0",
    },
    md: {
      container: "w-10 h-10",
      text: "text-sm",
      status: "w-3 h-3 bottom-0 right-0",
    },
    lg: {
      container: "w-12 h-12",
      text: "text-base",
      status: "w-3.5 h-3.5 bottom-0 right-0",
    },
    xl: {
      container: "w-16 h-16",
      text: "text-lg",
      status: "w-4 h-4 bottom-0 right-0",
    },
  };

  // Status colors
  const statusColors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    busy: "bg-red-500",
    offline: "bg-gray-400",
  };

  // Generate background color from name
  const getBackgroundColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-gray-500",
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const config = sizeConfig[size];
  const initials = getInitials(name);
  const bgColor = getBackgroundColor(name);

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center text-white font-medium overflow-hidden",
          "ring-2 ring-white dark:ring-gray-800",
          config.container,
          config.text,
          !src && bgColor,
          onClick &&
            "cursor-pointer hover:ring-gray-300 transition-all duration-200",
          className
        )}
        onClick={onClick}
        title={name}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {/* Status Indicator */}
      {showStatus && (
        <span
          className={cn(
            "absolute rounded-full border-2 border-white dark:border-gray-800",
            config.status,
            statusColors[status]
          )}
          title={`${status.charAt(0).toUpperCase() + status.slice(1)}`}
        />
      )}
    </div>
  );
};

export default ProfileAvatar;
