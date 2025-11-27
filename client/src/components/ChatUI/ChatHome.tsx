import { useState } from "react";
import type React from "react";
import type { Chat } from "../../types/chat";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
const ChatHome: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  console.log(selectedChat);
  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <ChatList
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      </div>
      <div className="flex-1">
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatHome;
