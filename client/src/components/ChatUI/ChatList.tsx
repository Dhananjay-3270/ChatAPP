import type React from "react";
import { useEffect, useState } from "react";
import { ChatService } from "../../services/ChatService";
import { StatusCode } from "../../../core/utils/enum";
import { EllipsisVertical, Search } from "lucide-react";
import { InputSearch } from "../InputSearch/InputSearch";
import ChatListItem from "./ChatListItem";
interface ChatUser {
  _id: string;
  fullName: string;
  userName: string;
}

interface ChatItem {
  _id: string;
  isGroup: boolean;
  members: ChatUser[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const ChatList: React.FC = () => {
  const [chats, setChats] = useState<ChatItem[] | null>(null);

  useEffect(() => {
    const getChats = async () => {
      const chats = await ChatService.getChats();
      if (chats.status === StatusCode.OK) {
        setChats(chats.data as ChatItem[]);
      }
    };
    getChats();
  }, []);
  console.log(chats);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-3.5 justify-around">
        Messages
        <div>
          <EllipsisVertical />
        </div>
      </div>
      <div className="p-3.5 flex justify-center ">
        <InputSearch
          variant="default"
          width="md"
          size="md"
          placeholder="Search people.."
          leftIcon={<Search />}
        />
      </div>
      <div className="flex flex-col overflow-y-scroll">
        {chats &&
          chats?.map((chat, index) => {
            return <ChatListItem key={index} chat={chat} />;
          })}
      </div>
    </div>
  );
};

export default ChatList;
