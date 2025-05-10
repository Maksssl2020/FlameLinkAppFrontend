import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRelationshipsRequest } from "../../types/userTypes.ts";
import { handleLikeUser } from "../../api/matches-api.ts";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

function useLikeUserMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: likeUser, isPending: likingUser } = useMutation({
    mutationKey: ["likeUserMutation"],
    mutationFn: (data: UserRelationshipsRequest) =>
      handleLikeUser(data.sourceUserId, data.targetUserId),
    onSuccess: (_, variables) => {
      onSuccess?.();

      queryClient.invalidateQueries({
        queryKey: ["matchingUsers", variables.sourceUserId],
      });
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });

  return { likeUser, likingUser };
}

export default useLikeUserMutation;
