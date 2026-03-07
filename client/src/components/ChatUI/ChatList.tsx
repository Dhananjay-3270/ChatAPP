import type React from "react";
import { EllipsisVertical, Search } from "lucide-react";
import { InputSearch } from "../InputSearch/InputSearch";
import ChatListItem from "./ChatListItem";
import type { ChatListProps, ChatItem } from "../../types/chat";
import { useChatFetch } from "../../hooks/useChatFetch";

const ChatList: React.FC<ChatListProps> = (props) => {
  const { selectedChat, setSelectedChat } = props;

  const { data: chats } = useChatFetch<ChatItem[] | null>("chats");

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="flex-shrink-0 flex flex-row p-3.5 justify-around text-gray-900 dark:text-gray-100">
        Messages
        <div className="text-gray-600 dark:text-gray-400">
          <EllipsisVertical />
        </div>
      </div>
      <div className="flex-shrink-0 p-3.5 flex justify-center ">
        <InputSearch
          variant="default"
          width="lg"
          size="md"
          placeholder="Search people & Chats"
          rightIcon={<Search />}
        />
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        {chats &&
          chats?.map((chat, index) => {
            return (
              <ChatListItem
                key={index}
                chat={chat}
                isSelected={selectedChat?._id === chat._id}
                onClick={(chat) => setSelectedChat(chat)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ChatList;
