import React from "react";
import type { AdaptedMessage } from "../../types/chat";
import { MessageBubble } from "./MessageBubble";
interface MessageContainerProps {
  uiMessages: AdaptedMessage[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({ uiMessages }) => {
  console.log(uiMessages);
  return (
    <div className="flex-1 w-full bg-cover bg-center bg-no-repeat overflow-y-auto p-4 flex flex-col gap-2">
      {uiMessages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageContainer;
