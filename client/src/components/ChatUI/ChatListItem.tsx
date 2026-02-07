import ProfileAvatar from "../Profile";
import { useUser } from "../../Context/UserContext";
import { getChatDisplayName } from "../../utils/chatUtils";
import type React from "react";
import type { ChatListItemProps } from "../../types/chat";

const ChatListItem: React.FC<ChatListItemProps> = ({
  chat,
  onClick,
  isSelected,
}) => {
  const { user } = useUser();

  return (
    <div
      className={`flex flex-row  h-16 p-2.5 gap-2.5 cursor-pointer transition-colors rounded-lg ${
        isSelected
          ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
      onClick={() => onClick(chat)}
    >
      <ProfileAvatar
        name={getChatDisplayName(user?.userName || "", chat?.members)}
        size="sm"
      />
      <div className="flex-1 flex-col">
        <p className="font-medium truncate text-gray-900 dark:text-gray-100">
          {getChatDisplayName(user?.userName || "", chat?.members)}
        </p>
        <div className="flex justify-between items-end">
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate leading-tight flex-1">
            {chat?.latestMessage?.content}
          </p>
          {chat?.latestMessage && (
            <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              {new Date(chat.latestMessage.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
