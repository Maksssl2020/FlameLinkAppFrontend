import { useMutation } from "@tanstack/react-query";
import { ForumPostRequest } from "../../types/forumPostTypes.ts";
import { handleCreateForumPost } from "../../api/fodum-posts-api.ts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

function useAddForumPostMutation(onSuccess?: () => void) {
  const { mutate: addForumPost, isPending: addingForumPost } = useMutation({
    mutationKey: ["addForumPost"],
    mutationFn: (data: ForumPostRequest) => handleCreateForumPost(data),
    onSuccess: () => {
      toast.success("Forum post added successfully.");
      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });

  return { addForumPost, addingForumPost };
}

export default useAddForumPostMutation;
