import type React from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
const ChatHome: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <ChatList />
      </div>
      <div className="flex-1">
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatHome;
