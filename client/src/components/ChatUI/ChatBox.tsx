import type React from "react";
import type { ChatBoxProps } from "../../types/chat";
import { useEffect, useState } from "react";
import { ChatService } from "../../services/ChatService";
import { StatusCode } from "../../../core/utils/enum";
import type { Message } from "../../types/chat";
import ProfileAvatar from "../Profile";
import { getChatDisplayName } from "../../utils/chatUtils";
import { useUser } from "../../Context/UserContext";
import MessageContainer from "./MessageContainer";
const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[] | null>(null);
  const { selectedChat } = props;

  useEffect(() => {
    const getAllMessages = async () => {
      if (selectedChat) {
        const response = await ChatService.getAllMessages(selectedChat?._id);
        if (response.status === StatusCode.OK) {
          setMessages(response.data as Message[]);
        }
      }
    };
    getAllMessages();
  }, [selectedChat]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-2.5 bg-gray-300">
        <ProfileAvatar
          name={getChatDisplayName(user?.userName || "", selectedChat?.members)}
          size="md"
        />
        <div className="p-2.5 flex justify-center ">
          {getChatDisplayName(user?.userName || "", selectedChat?.members)}
        </div>
      </div>
      <MessageContainer />
    </div>
  );
};

export default ChatBox;
