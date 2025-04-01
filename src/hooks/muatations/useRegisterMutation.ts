import { useMutation } from "@tanstack/react-query";
import { RegisterDataState } from "../../types/authenticationTypes.ts";
import { handleRegister } from "../../api/authentication-api.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.ts";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../types/types.ts";

function useRegisterMutation() {
  const navigate = useNavigate();

  const { mutate: register, isPending: registering } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterDataState) => handleRegister(data),
    onSuccess: (response) => {
      useAuthStore.getState().login(response);
      toast.success("Register successful!");
      navigate("/dashboard/discover-people");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { register, registering };
}

export default useRegisterMutation;
