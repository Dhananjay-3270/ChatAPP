import type React from "react";
import { EllipsisVertical, Search } from "lucide-react";
import { InputSearch } from "../InputSearch/InputSearch";
import ChatListItem from "./ChatListItem";
import type { ChatListProps, SearchResult } from "../../types/chat";
import { useChatFetch } from "../../hooks/useChatFetch";
import { useState } from "react";
import { ChatService } from "../../services/ChatService";

const ChatList: React.FC<ChatListProps> = (props) => {
  const [search, setSearch] = useState("");

  const { selectedChat, setSelectedChat } = props;
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const getChatAcess = async (data) => {
    const userEmail = data.email;
    const response = await ChatService.createChat(userEmail);
    const chat = response.data;
    setSelectedChat(chat);
  };

  const { data: result } = useChatFetch<SearchResult | null>(
    ["chats", `${search}`],
    search,
  );

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="flex-shrink-0 flex flex-row p-3.5 justify-around text-gray-900 dark:text-gray-100">
        Messages
        <div className="text-gray-600 dark:text-gray-400">
          <EllipsisVertical />
        </div>
      </div>
      <div className="flex-shrink-0 p-3.5 flex justify-center ">
        <InputSearch
          variant="default"
          width="lg"
          size="md"
          placeholder="Search people & Chats"
          rightIcon={<Search />}
          onChange={handleSearch}
        />
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        {result &&
          result?.data.map((data, index) => {
            return (
              <ChatListItem
                key={index}
                data={data}
                type={result.resultType}
                isSelected={
                  result.resultType === "chats"
                    ? selectedChat?._id === data._id
                    : false
                }
                onClick={
                  result.resultType === "chats"
                    ? (data) => setSelectedChat(data)
                    : (data) => getChatAcess(data)
                }
              />
            );
          })}
        {}
      </div>
    </div>
  );
};

export default ChatList;
