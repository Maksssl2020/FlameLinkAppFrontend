import { Image } from "./imageTypes.ts";

export interface MessageRequest {
  senderId: number;
  recipientId: number;
  content: string;
}

export interface Message {
  id: number;
  senderId: number;
  senderUsername: string;
  senderAvatar?: Image;
  recipientId: number;
  recipientUsername: string;
  recipientAvatar?: Image;
  content: string;
  sentAt: string;
}

export interface ConversationPreview {
  userId: number;
  username: string;
  avatar?: Image;
  lastMessage: string;
  lastMessageSentAt: string;
}
