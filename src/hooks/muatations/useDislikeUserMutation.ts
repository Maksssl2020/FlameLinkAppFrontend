import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDislikeUser } from "../../api/dislikes-api.ts";
import { UserRelationshipsRequest } from "../../types/userTypes.ts";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useUserFilterParamsStore } from "../../store/userFilterParamsStore.ts";

function useDislikeUserMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const { userParams } = useUserFilterParamsStore.getState();

  const { mutate: dislikeUser, isPending: dislikingUser } = useMutation({
    mutationKey: ["dislikeUserMutation"],
    mutationFn: (data: UserRelationshipsRequest) =>
      handleDislikeUser(data.sourceUserId, data.targetUserId),
    onSuccess: (_, variables) => {
      onSuccess?.();

      queryClient.invalidateQueries({
        queryKey: ["matchingUsers", userParams, variables.sourceUserId],
      });

      queryClient.invalidateQueries({
        queryKey: ["userLikedUsersData", variables.sourceUserId],
      });

      queryClient.invalidateQueries({
        queryKey: ["isUserDislikedData", variables.targetUserId],
      });
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });

  return { dislikeUser, dislikingUser };
}

export default useDislikeUserMutation;
