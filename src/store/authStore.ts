import { AuthenticationResponse } from "../types/authenticationTypes.ts";
import { create } from "zustand/react";

interface AuthState {
  authentication: AuthenticationResponse | null;
  login: (data: AuthenticationResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((setState) => ({
  authentication: null,
  login: (data) => setState({ authentication: data }),
  logout: () => setState({ authentication: null }),
}));
