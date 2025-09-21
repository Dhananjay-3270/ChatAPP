import { UserPen, Settings, LogOut, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { StatusCode } from "../../core/utils/enum";
import { useUser } from "../Context/UserContext";
interface Hamburgerprops {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Hamburger: React.FC<Hamburgerprops> = ({ open, setOpen }) => {
  const {user} = useUser()
  const navigate = useNavigate();
  const [profiletoggle, setProfileToggle] = useState(false);
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AuthService.logout();
      if (response.status === StatusCode.OK) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-row justify-between relative p-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-20">
      {/* Overlay for dim effect */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 "
          onClick={() => setOpen(false)}
        />
      )}

      <div className="z-20 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg ml-1.5">
        <MessageCircle />
      </div>
      <div className="profile-section relative flex items-center gap-2.5 mr-2">
        <div className="flex items-center">
          <h2>{user?.fullName}</h2>
        </div>
        <UserPen
          className="cursor-pointer text-gray-700 dark:text-gray-300 pr-1 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          onClick={() => setProfileToggle(!profiletoggle)}
          size={28}
        />

        {profiletoggle && (
          <div className="absolute top-10 right-0 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-40 p-3 flex flex-col gap-2 border border-gray-200 dark:border-gray-600">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
              onClick={() => setProfileToggle(false)}
            >
              <Settings
                className="text-gray-700 dark:text-gray-300"
                size={20}
              />
              Settings
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition"
              onClick={handleLogout}
            >
              <LogOut className="text-red-500 dark:text-red-400" size={20} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
