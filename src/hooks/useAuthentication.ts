import { useAuthStore } from "../store/authStore.ts";

function useAuthentication() {
  return useAuthStore.getState().authentication;
}

export default useAuthentication;
