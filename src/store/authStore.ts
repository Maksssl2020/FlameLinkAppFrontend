import {
  AuthenticationState,
  AuthenticationResponse,
} from "../types/authenticationTypes.ts";
import { create } from "zustand/react";
import { persist, PersistStorage } from "zustand/middleware";

interface AuthStoreState {
  authentication: AuthenticationState;
  login: (data: AuthenticationResponse) => void;
  logout: () => void;
}

const initialAuthenticationState: AuthenticationState = {
  username: null,
  isAuthenticated: false,
  userId: null,
  accessToken: null,
  roles: [],
};

const sessionStorageAdapter: PersistStorage<AuthStoreState> = {
  getItem: (key) => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  },
  setItem: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key) => {
    sessionStorage.removeItem(key);
  },
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (setState) => ({
      authentication: initialAuthenticationState,
      login: (data) =>
        setState({ authentication: { ...data, isAuthenticated: true } }),
      logout: () => setState({ authentication: initialAuthenticationState }),
    }),
    {
      name: "auth-storage",
      storage: sessionStorageAdapter,
    },
  ),
);
