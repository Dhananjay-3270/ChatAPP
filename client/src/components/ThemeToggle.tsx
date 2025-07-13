import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";
export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => (theme === "dark" ? <Sun /> : <Moon />);

  return (
    <button
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      onClick={toggleTheme}
    >
      {getIcon()}
    </button>
  );
};
