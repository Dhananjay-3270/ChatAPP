import React from "react";
import type { AdaptedMessage } from "../../types/chat";
import { cn } from "../../utils/cn";
interface MessageBubbleProps {
  message: AdaptedMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { id, content, sender, timestamp, direction, chatId } = message;

  const baseClasses =
    "max-w-[65%] py-2 text-sm leading-relaxed break-words rounded-2xl flex flex-col";

  const directionClass =
    direction === "incoming"
      ? "self-start bg-gray-100 text-gray-900 rounded-tl-sm pl-3 pr-2"
      : "self-end bg-blue-600 text-white rounded-tr-sm pl-2 pr-3";

  const styles = cn(baseClasses, directionClass);

  return (
    <div className={styles}>
      <div className="w-auto font-normal ">{content}</div>
      <div className="flex flex-row justify-end font-extralight text-[12px] leading-none opacity-50">
        {timestamp}
      </div>
    </div>
  );
};
