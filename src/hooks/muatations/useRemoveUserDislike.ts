import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRelationshipsRequest } from "../../types/userTypes.ts";
import { handleRemoveDislike } from "../../api/dislikes-api.ts";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

function useRemoveUserDislike(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: removeUserDislike, isPending: removingUserDislike } =
    useMutation({
      mutationKey: ["removeUserDislike"],
      mutationFn: (data: UserRelationshipsRequest) =>
        handleRemoveDislike(data.sourceUserId, data.targetUserId),
      onSuccess: (_, variables) => {
        onSuccess?.();

        queryClient.invalidateQueries({
          queryKey: ["dislikedUsers", variables.sourceUserId],
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

  return { removeUserDislike, removingUserDislike };
}

export default useRemoveUserDislike;
