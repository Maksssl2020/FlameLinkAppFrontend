import { useMutation } from "@tanstack/react-query";
import { ChangePasswordRequest } from "../../types/userTypes.ts";
import { handlePasswordChange } from "../../api/users-api.ts";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

function useChangePasswordMutation(onSuccess?: () => void) {
  const { mutate: changePassword, isPending: changingPassword } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: (data: ChangePasswordRequest) => handlePasswordChange(data),
    onSuccess: () => {
      toast.success("Password changed successfully.");
      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });

  return { changePassword, changingPassword };
}

export default useChangePasswordMutation;
