import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Message, MessageRequest } from "../../types/messageTypes.ts";
import { handleSendMessage } from "../../api/messages-api.ts";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

function useSendMessageMutation(onSuccess?: (data: Message) => void) {
  const queryClient = useQueryClient();

  const { mutate: sendMessage, isPending: sendingMessage } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: (data: MessageRequest) => handleSendMessage(data),
    onSuccess: (data, variables) => {
      onSuccess?.(data);

      queryClient.invalidateQueries({
        queryKey: ["usersMessagesQuery", variables.senderId],
      });
      queryClient.invalidateQueries({
        queryKey: ["usersMessagesQuery", variables.recipientId],
      });
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });

  return { sendMessage, sendingMessage };
}

export default useSendMessageMutation;
