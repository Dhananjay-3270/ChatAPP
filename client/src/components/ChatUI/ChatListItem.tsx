import ProfileAvatar from "../Profile";
import { useUser } from "../../Context/UserContext";
import { getChatDisplayName } from "../../utils/chatUtils";
import type React from "react";

interface ChatUser {
  _id: string;
  fullName: string;
  userName: string;
}

interface Chat {
  _id: string;
  isGroup: boolean;
  members: ChatUser[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: React.Dispatch<React.SetStateAction<Chat | null>>;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  chat,
  onClick,
  isSelected,
}) => {
  const { user } = useUser();

  return (
    <div
      className={`flex flex-row h-16 p-2.5 gap-2.5 cursor-pointer transition-colors rounded-lg ${
        isSelected
          ? "bg-primary/10 border border-primary/20"
          : "hover:bg-accent/50"
      }`}
      onClick={() => onClick(chat)}
    >
      <ProfileAvatar name="John Doe" size="sm" />
      <div className="flex-col">
        <p className="font-medium truncate">
          {getChatDisplayName(user?.userName || "", chat)}
        </p>
        <div className="flex justify-end">
          <p className="text-sm text-muted-foreground truncate leading-tight">
            Where are u
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
