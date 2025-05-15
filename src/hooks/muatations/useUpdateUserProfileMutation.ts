import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserProfileRequest } from "../../types/userProfileTypes.ts";
import useAuthentication from "../useAuthentication.ts";
import { handleUpdateUserProfile } from "../../api/users-profiles-api.ts";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useUpdateUserProfileMutation(onSuccess?: () => void) {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: updateUserProfile, isPending: updatingUserProfile } =
    useMutation({
      mutationKey: ["updateUserProfile"],
      mutationFn: async (data: UpdateUserProfileRequest) => {
        if (userId) {
          return await handleUpdateUserProfile(userId, data);
        }
      },
      onSuccess: () => {
        toast.success("Updated profile successfully.");
        onSuccess?.();

        queryClient.invalidateQueries({
          queryKey: ["userProfile", userId],
        });
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { updateUserProfile, updatingUserProfile };
}

export default useUpdateUserProfileMutation;
