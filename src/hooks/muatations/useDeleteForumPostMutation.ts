import { useMutation } from "@tanstack/react-query";
import { handleDeleteForumPost } from "../../api/forum-posts-api.ts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

function useDeleteForumPostMutation(onSuccess?: () => void) {
  const { mutate: deleteForumPost, isPending: deletingForumPost } = useMutation(
    {
      mutationKey: ["deleteForumPost"],
      mutationFn: (postId) => handleDeleteForumPost(postId),
      onSuccess: () => {
        toast.success("Forum post deleted successfully.");
        onSuccess?.();
      },
      onError: (error: AxiosError) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      },
    },
  );

  return { deleteForumPost, deletingForumPost };
}

export default useDeleteForumPostMutation;
