import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserDataRequest } from "../../types/userTypes.ts";
import { handleAccountDataUpdate } from "../../api/users-api.ts";
import useAuthentication from "../useAuthentication.ts";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

function useUpdateAccountDataMutation(onSuccess?: () => void) {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: updateAccountData, isPending: updatingAccountData } =
    useMutation({
      mutationKey: ["updateUserData"],
      mutationFn: (data: UpdateUserDataRequest) =>
        handleAccountDataUpdate(data),
      onSuccess: () => {
        toast.success("Account updated successfully.");
        onSuccess?.();

        queryClient.invalidateQueries({
          queryKey: ["userData", userId],
        });
      },
      onError: (error: AxiosError) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      },
    });

  return { updateAccountData, updatingAccountData };
}

export default useUpdateAccountDataMutation;
