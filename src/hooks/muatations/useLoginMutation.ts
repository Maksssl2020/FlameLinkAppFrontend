import { useMutation } from "@tanstack/react-query";
import {
  AuthenticationResponse,
  LoginRequest,
} from "../../types/authenticationTypes.ts";
import { handleLogin } from "../../api/authentication-api.ts";
import { useAuthStore } from "../../store/authStore.ts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

function useLoginMutation() {
  const navigate = useNavigate();

  const { mutate: login, isPending: logging } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginRequest) => handleLogin(data),
    onSuccess: (response: AuthenticationResponse) => {
      useAuthStore.getState().login(response);
      toast.success("Logged in successfully!");
      navigate("/dashboard/discover-people");
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });

  return { login, logging };
}

export default useLoginMutation;
