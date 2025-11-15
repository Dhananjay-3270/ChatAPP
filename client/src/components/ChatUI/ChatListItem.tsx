import ProfileAvatar from "../Profile";
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
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat }) => {
  console.log(chat);
  return (
    <div className="flex flex-row h-16 p-2.5 gap-5">
      <ProfileAvatar name="John Doe" size="sm" />
      <div className="flex-col">
        <p className="font-medium truncate">John</p>
        <div className="flex justify-end"><p className="text-sm text-muted-foreground truncate leading-tight">
          Where are u
        </p>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
