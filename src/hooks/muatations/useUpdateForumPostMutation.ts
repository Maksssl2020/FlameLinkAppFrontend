import { useMutation } from "@tanstack/react-query";
import { handleUpdateForumPost } from "../../api/forum-posts-api.ts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ForumPostRequest } from "../../types/forumPostTypes.ts";

function useUpdateForumPostMutation(onSuccess?: () => void) {
  const { mutate: updateForumPost, isPending: updatingForumPost } = useMutation(
    {
      mutationKey: ["updateForumPost"],
      mutationFn: ({
        postId,
        data,
      }: {
        postId: number;
        data: ForumPostRequest;
      }) => handleUpdateForumPost(postId, data),
      onSuccess: () => {
        toast.success("Forum post updated successfully.");
        onSuccess?.();
      },
      onError: (error: AxiosError) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      },
    },
  );

  return { updateForumPost, updatingForumPost };
}

export default useUpdateForumPostMutation;
