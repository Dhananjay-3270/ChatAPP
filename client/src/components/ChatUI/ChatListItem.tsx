import ProfileAvatar from "../Profile";
import { useUser } from "../../Context/UserContext";
import { getChatDisplayName } from "../../utils/chatUtils";
import type React from "react";
import type { ChatListItemProps } from "../../types/chat";
import type { Chat, User } from "../../types/chat";
const ChatListItem: React.FC<ChatListItemProps> = ({
  data,
  onClick,
  type,
  isSelected,
}) => {
  console.log(type);
  const { user } = useUser();

  const isChat = (item: Chat | User): item is Chat => {
    return (item as Chat).members !== undefined;
  };
  const renderUI = (view: string) => {
    switch (view) {
      case "chats":
        return (
          <div
            className={`flex flex-row  h-16 p-2.5 gap-2.5 cursor-pointer transition-colors rounded-lg ${
              isSelected
                ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            onClick={() => onClick?.(data)}
          >
            <ProfileAvatar
              name={
                isChat(data)
                  ? getChatDisplayName(user?.userName || "", data.members)
                  : ""
              }
              size="sm"
            />
            <div className="flex-1 flex-col">
              <p className="font-medium truncate text-gray-900 dark:text-gray-100">
                {getChatDisplayName(user?.userName || "", data?.members)}
              </p>
              <div className="flex justify-between items-end">
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate leading-tight flex-1">
                  {data?.latestMessage?.content}
                </p>
                {data?.latestMessage && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {new Date(data.latestMessage.createdAt).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        break;
      case "users":
        return (
          <div
            className={`flex flex-row  h-16 p-2.5 gap-2.5 cursor-pointer transition-colors rounded-lg ${
              isSelected
                ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <ProfileAvatar name={user?.userName || ""} size="sm" />
            <div className="flex-1 flex-col">
              <p className="font-medium truncate text-gray-900 dark:text-gray-100">
                {user?.userName || ""}
              </p>
              {/* <div className="flex justify-between items-end">
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate leading-tight flex-1">
                {data?.latestMessage?.content}
              </p>
              {data?.latestMessage && (
                <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {new Date(data.latestMessage.createdAt).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </div>
              )}
            </div> */}
            </div>
          </div>
        );
        break;
      default:
        return null;
    }
  };

  return renderUI(type);
};

export default ChatListItem;
