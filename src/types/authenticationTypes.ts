export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthenticationResponse {
  id: number;
  username: string;
  accessToken: string;
}
