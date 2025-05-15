import axiosConfig from "../config/axiosConfig.ts";
import { ConversationPreview } from "../types/messageTypes.ts";

export async function fetchUserConversations(userId: string | number) {
  const response = await axiosConfig.get<ConversationPreview[]>(
    `conversations/all/by-user/${userId}`,
  );
  return response.data;
}

export async function handleCreateConversation(
  senderId: number | string,
  recipientId: number | string,
) {
  const response = await axiosConfig.post<ConversationPreview[]>(
    `conversations`,
    {
      senderId,
      recipientId,
    },
  );
  return response.data;
}
