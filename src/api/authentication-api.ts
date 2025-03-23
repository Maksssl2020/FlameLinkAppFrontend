import {
  AuthenticationResponse,
  LoginRequest,
} from "../types/authenticationTypes.ts";
import axiosConfig from "../config/axiosConfig.ts";

export async function handleLogin(
  data: LoginRequest,
): Promise<AuthenticationResponse> {
  const response = await axiosConfig.post<AuthenticationResponse>(
    "/authentication/login",
    data,
  );
  return response.data;
}
