import useAuthentication from "../useAuthentication.ts";
import { useMutation } from "@tanstack/react-query";
import { handleCreateConversation } from "../../api/conversations-api.ts";
import { ConversationPreview } from "../../types/messageTypes.ts";
import toast from "react-hot-toast";

function useCreateConversationMutation(
  onSuccess: (data: ConversationPreview) => void,
) {
  const { userId } = useAuthentication();

  const { mutate: createConversation, isPending: creatingConversation } =
    useMutation({
      mutationKey: ["createConversation"],
      mutationFn: async (recipientId: string | number) => {
        if (userId) {
          return await handleCreateConversation(userId, recipientId);
        }
      },
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { createConversation, creatingConversation };
}

export default useCreateConversationMutation;
