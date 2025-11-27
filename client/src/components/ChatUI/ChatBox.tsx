import type React from "react";
import type { ChatBoxProps } from "../../types/chat";
import { useEffect } from "react";
import { ChatService } from "../../services/ChatService";
import { StatusCode } from "../../../core/utils/enum";
const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const { selectedChat } = props;
  console.log(selectedChat);
  useEffect(() => {
    const getAllMessages = async () => {
      const messages = await ChatService.getAllMessages(selectedChat?._id);
      if (messages.status === StatusCode.OK) {
        console.log(messages);
      }
    };
    getAllMessages();
  });

  return <div>ChatBox</div>;
};

export default ChatBox;
