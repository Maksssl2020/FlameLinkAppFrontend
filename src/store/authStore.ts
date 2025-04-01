import {
  AuthenticationState,
  AuthenticationResponse,
} from "../types/authenticationTypes.ts";
import { create } from "zustand/react";
import { persist, PersistStorage } from "zustand/middleware";

interface AuthStoreState {
  authentication: AuthenticationState | null;
  login: (data: AuthenticationResponse) => void;
  logout: () => void;
}

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
      authentication: null,
      login: (data) =>
        setState({ authentication: { ...data, isAuthenticated: true } }),
      logout: () => setState({ authentication: null }),
    }),
    {
      name: "auth-storage",
      storage: sessionStorageAdapter,
    },
  ),
);
