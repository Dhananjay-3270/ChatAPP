import { useState } from "react";
import type React from "react";
import type { Chat, Message } from "../../types/chat";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import NoChatSelected from "../NoChatSelected";
import { MessageLoader } from "../Loader/MessageLoader";
import { useGetMessages } from "../../hooks/useGetMessages";

const ChatHome: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const { data: messages, isLoading } = useGetMessages(
    ["selectedChat", selectedChat?._id ?? ""],
    selectedChat?._id ?? "",
    {
      enabled: !!selectedChat,
    },
  ) as { data: Message[] | null; isLoading: boolean };

  // tanStack Query
  const handleChatSelect = (chat: Chat | null) => {
    setSelectedChat(chat);
  };
  return (
    <div className="flex h-full bg-white dark:bg-gray-900">
      <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 h-full">
        <ChatList
          selectedChat={selectedChat}
          setSelectedChat={handleChatSelect}
        />
      </div>
      <div className="flex-1 h-full flex flex-col">
        {isLoading ? (
          <MessageLoader />
        ) : selectedChat ? (
          <ChatBox selectedChat={selectedChat} messages={messages} />
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  );
};

export default ChatHome;
