import axiosConfig from "../config/axiosConfig.ts";
import { Message, MessageRequest } from "../types/messageTypes.ts";

export async function fetchUsersMessages(
  userId: string | number,
  recipientId: string | number,
) {
  const response = await axiosConfig.get<Message[]>(
    `/messages/${userId}/${recipientId}`,
  );
  return response.data;
}

export async function handleSendMessage(data: MessageRequest) {
  const response = await axiosConfig.post<Message>(`/messages`, data);
  return response.data;
}
