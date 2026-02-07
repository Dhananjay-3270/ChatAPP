import { useState } from "react";
import type React from "react";
import type { Chat } from "../../types/chat";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import NoChatSelected from "../NoChatSelected";
const ChatHome: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <div className="flex h-full bg-white dark:bg-gray-900">
      <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 h-full">
        <ChatList
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      </div>
      <div className="flex-1 h-full flex flex-col">
        {selectedChat ? (
          <ChatBox selectedChat={selectedChat} />
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  );
};

export default ChatHome;
