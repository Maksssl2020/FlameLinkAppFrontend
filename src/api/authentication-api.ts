import {
  AuthenticationResponse,
  LoginRequest,
  RegisterDataState,
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

export async function handleRegister(
  data: RegisterDataState,
): Promise<AuthenticationResponse> {
  const response = await axiosConfig.post<AuthenticationResponse>(
    "/authentication/register",
    { ...data, dateOfBirth: data.dateOfBirth?.toISOString().split("T")[0] },
  );
  return response.data;
}
