import { useAuthStore } from "../store/authStore.ts";

function useAuthentication() {
  return useAuthStore.getState();
}

export default useAuthentication;
