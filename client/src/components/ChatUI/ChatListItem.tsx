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
  console.log(chat);
  const { user } = useUser();

  return (
    <div
      className={`flex flex-row  h-16 p-2.5 gap-2.5 cursor-pointer transition-colors rounded-lg ${
        isSelected
          ? "bg-primary/10 border border-primary/20"
          : "hover:bg-accent/50"
      }`}
      onClick={() => onClick(chat)}
    >
      <ProfileAvatar
        name={getChatDisplayName(user?.userName || "", chat?.members)}
        size="sm"
      />
      <div className="flex-1 flex-col">
        <p className="font-medium truncate">
          {getChatDisplayName(user?.userName || "", chat?.members)}
        </p>
        <div className="flex justify-between items-end">
          <p className="text-sm text-muted-foreground truncate leading-tight flex-1">
            {chat?.latestMessage?.content}
          </p>
          {chat?.latestMessage && (
            <div className="text-xs text-muted-foreground ml-2">
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
