import { useMutation } from "@tanstack/react-query";
import { handleUpdateForumPost } from "../../api/fodum-posts-api.ts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

function useUpdateForumPostMutation(onSuccess?: () => void) {
  const { mutate: updateForumPost, isPending: updatingForumPost } = useMutation(
    {
      mutationKey: ["updateForumPost"],
      mutationFn: ({ number: postId, ForumPostRequest: data }) =>
        handleUpdateForumPost(postId, data),
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
