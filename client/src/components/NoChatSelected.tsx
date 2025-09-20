import React from "react";
import { MessageSquare } from "lucide-react";
const NoChatSelected: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center animate-bounce">
              <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Welcome to Chatty!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};
export default NoChatSelected;
