import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRelationshipsRequest } from "../../types/userTypes.ts";
import { handleRemoveLike } from "../../api/matches-api.ts";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

function useRemoveLikeMutation() {
  const queryClient = useQueryClient();

  const { mutate: removeUserLike, isPending: removingUserLike } = useMutation({
    mutationKey: ["removeLikeMutation"],
    mutationFn: (data: UserRelationshipsRequest) =>
      handleRemoveLike(data.sourceUserId, data.targetUserId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userLikedUsersData", variables.sourceUserId],
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

  return { removeUserLike, removingUserLike };
}

export default useRemoveLikeMutation;
