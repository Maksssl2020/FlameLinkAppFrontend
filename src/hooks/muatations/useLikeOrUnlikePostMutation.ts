import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthentication from "../useAuthentication.ts";
import { handleLikeOrUnLikePost } from "../../api/forum-posts-api.ts";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

function useLikeOrUnlikePostMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: likeOrUnlikePost, isPending: likingOrUnlikingPost } =
    useMutation({
      mutationKey: ["likeOrUnlikePostMutation"],
      mutationFn: async (postId: number | string) => {
        if (userId) {
          await handleLikeOrUnLikePost(postId, userId);
        }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["forumPostById", variables],
        });
        queryClient.invalidateQueries({
          queryKey: ["isPostLikedByUser", variables, userId],
        });
      },
      onError: (error: AxiosError) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      },
    });

  return { likeOrUnlikePost, likingOrUnlikingPost };
}

export default useLikeOrUnlikePostMutation;
