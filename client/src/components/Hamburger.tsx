import {
  Menu,
  Home,
  MessageSquare,
  Dock,
  UserPen,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
interface Hamburgerprops {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Hamburger: React.FC<Hamburgerprops> = ({ open, setOpen }) => {
  const [profiletoggle, setProfileToggle] = useState(false);
  return (
    <div className="flex flex-row justify-between relative p-2">
      {/* Overlay for dim effect */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 "
          onClick={() => setOpen(false)}
        />
      )}

      <div className="z-20">
        {!open && (
          <Menu onClick={() => setOpen(!open)} style={{ cursor: "pointer" }} />
        )}
        {open && (
          <div
            className="sidebar fixed left-0 top-0 w-48 h-screen px-6 py-8 bg-white shadow-2xl z-30 transition-all"
            onClick={() => setOpen(!open)}
          >
            <nav>
              <ul>
                <li>
                  <Link to="/Home" onClick={() => setOpen(false)}>
                    <div className="flex items-center gap-3 m-3 cursor-pointer text-gray-800 hover:bg-gray-200 rounded px-3 py-2 transition">
                      <Home className="text-gray-700" />
                      Home
                    </div>
                  </Link>
                </li>
                <li>
                  <div className="flex items-center gap-3 m-3 cursor-pointer text-gray-800 hover:bg-gray-200 rounded px-3 py-2 transition">
                    <MessageSquare className="text-gray-700" />
                    Chat
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-3 m-3 cursor-pointer text-gray-800 hover:bg-gray-200 rounded px-3 py-2 transition">
                    <Dock className="text-gray-700" />
                    About
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
      <div className="profile-section relative flex items-center">
         
          <UserPen
            className="cursor-pointer text-gray-700"
            onClick={() => setProfileToggle(!profiletoggle)}
            size={28}
          />
       
        {profiletoggle && (
          <div className="absolute top-10 right-0 w-44 bg-white rounded-lg shadow-xl z-40 p-3 flex flex-col gap-2">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-800 transition"
              onClick={() => setProfileToggle(false)}
            >
              <Settings className="text-gray-700" size={20} />
              Settings
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-red-100 text-red-600 transition"
              onClick={() => setProfileToggle(false)}
            >
              <LogOut className="text-red-500" size={20} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
