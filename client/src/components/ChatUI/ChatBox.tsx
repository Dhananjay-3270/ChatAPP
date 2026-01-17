import type React from "react";
import type { ChatBoxProps } from "../../types/chat";
import { useEffect, useState } from "react";
import { ChatService } from "../../services/ChatService";
import { StatusCode } from "../../../core/utils/enum";
import type { Message, AdaptedMessage } from "../../types/chat";
import ProfileAvatar from "../Profile";
import { getChatDisplayName, messageAdapter } from "../../utils/chatUtils";
import { useUser } from "../../Context/UserContext";
import MessageContainer from "./MessageContainer";
import { socket } from "../../websocket/socket";
import { InputSearch } from "../InputSearch/InputSearch";
import { SendHorizonal } from "lucide-react";

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [uiMessages, setUIMessages] = useState<AdaptedMessage[]>([]);

  useEffect(() => {
    if (messages && user?.email) {
      const adaptedMessages = messageAdapter(messages, user.email);
      setUIMessages(adaptedMessages);
    } else {
      setUIMessages([]);
    }
  }, [messages, user?.email]);
  const { selectedChat } = props;
  useEffect(() => {
    socket.emit("chat:join", {
      chatId: selectedChat?._id,
    });

    return () => {
      socket.emit("chat:leave", {
        chatId: selectedChat?._id,
      });
    };
  }, []);

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
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 flex flex-row items-center px-4 h-16 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <ProfileAvatar
          name={getChatDisplayName(user?.userName || "", selectedChat?.members)}
          size="md"
        />
        <span className="ml-3 font-medium text-gray-900 dark:text-gray-100 truncate">
          {getChatDisplayName(user?.userName || "", selectedChat?.members)}
        </span>
      </div>
      <MessageContainer uiMessages={uiMessages} />
      <div className="flex-shrink-0 p-4 ">
        <InputSearch
          variant="default"
          size="lg"
          borderRadius="full"
          rightIcon={<SendHorizonal />}
          iconSize="md"
        />
      </div>
    </div>
  );
};

export default ChatBox;
