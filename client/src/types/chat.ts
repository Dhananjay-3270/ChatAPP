import type React from "react";

// Base user interface for chat members
export interface ChatUser {
    _id: string;
    fullName: string;
    userName: string;
    displayName?: string;
    firstName?: string;
    lastName?: string;
}

// Message sender interface (same structure as ChatUser but keeping separate for clarity)
export interface MessageSender {
    _id: string;
    fullName: string;
    userName: string;
}

// Latest message structure
export interface LatestMessage {
    _id: string;
    sender: MessageSender;
    content: string;
    chat: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Main chat interface
export interface Chat {
    _id: string;
    isGroup: boolean;
    members: ChatUser[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    latestMessage?: LatestMessage;
}

// Legacy alias for ChatItem (for backward compatibility)
export type ChatItem = Chat;

// Component prop interfaces
export interface ChatListProps {
    selectedChat: Chat | null;
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}

export interface ChatListItemProps {
    chat: Chat;
    isSelected: boolean;
    onClick: React.Dispatch<React.SetStateAction<Chat | null>>;
}

export interface ChatBoxProps {
    selectedChat?: Chat | null;
}

// Utility interfaces for chat utils functions
export interface ChatUtilsChat {
    members: ChatUser[];
}


export interface Status {
    state: string;
    description: string;
}

export interface Sender {
    status: Status;
    _id: string;
    fullName: string;
    userName: string;
    email: string;
}

export interface Message {
    _id: string;
    sender: Sender;
    content: string;
    chat: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}