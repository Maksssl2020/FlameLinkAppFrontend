import { useAuthStore } from "../../store/authStore.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchUserLikedUsers } from "../../api/matches-api.ts";

function useUserLikedUsers() {
  const { userId } = useAuthStore.getState().authentication;

  const { data: userLikedUsers, isLoading: fetchingUserLikedUsers } = useQuery({
    queryKey: ["userLikedUsersData", userId],
    queryFn: async () => {
      if (userId) {
        return await fetchUserLikedUsers(userId);
      }
    },
    enabled: !!userId,
  });

  return { userLikedUsers, fetchingUserLikedUsers };
}

export default useUserLikedUsers;
