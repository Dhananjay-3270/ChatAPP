import React, { useEffect } from "react";
import { UserService } from "../services/UserService";
import { StatusCode } from "../../core/utils/enum";
const SideBar: React.FC = () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserService.getUsers();
        if (response.status === StatusCode.OK) {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Chats
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 text-gray-600 dark:text-gray-400">
          No conversations yet...
        </div>
      </div>
    </div>
  );
};
export default SideBar;
