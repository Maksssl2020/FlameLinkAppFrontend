import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRelationshipsRequest } from "../../types/userTypes.ts";
import { handleLikeUser } from "../../api/matches-api.ts";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useUserFilterParamsStore } from "../../store/userFilterParamsStore.ts";

function useLikeUserMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const { userParams } = useUserFilterParamsStore.getState();

  const { mutate: likeUser, isPending: likingUser } = useMutation({
    mutationKey: ["likeUserMutation"],
    mutationFn: (data: UserRelationshipsRequest) =>
      handleLikeUser(data.sourceUserId, data.targetUserId),
    onSuccess: (_, variables) => {
      onSuccess?.();

      queryClient.invalidateQueries({
        queryKey: ["matchingUsers", userParams, variables.sourceUserId],
      });

      queryClient.invalidateQueries({
        queryKey: ["isUserLikedData", variables.targetUserId],
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
