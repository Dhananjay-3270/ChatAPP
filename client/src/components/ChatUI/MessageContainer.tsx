import React, { useRef, useEffect } from "react";
import type { AdaptedMessage } from "../../types/chat";
import { MessageBubble } from "./MessageBubble";

interface MessageContainerProps {
  uiMessages: AdaptedMessage[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({ uiMessages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [uiMessages]);

  return (
    <div className="flex-1 min-h-0 w-full bg-cover bg-center bg-no-repeat overflow-y-auto p-4 flex flex-col gap-2">
      {uiMessages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageContainer;
