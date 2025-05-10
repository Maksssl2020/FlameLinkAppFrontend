import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore.ts";
import { fetchUserMatches } from "../../api/matches-api.ts";

function useUserMatchesQuery() {
  const { userId } = useAuthStore.getState().authentication;

  const { data: userMatches, isLoading: fetchingUserMatches } = useQuery({
    queryKey: ["userMatchesData", userId],
    queryFn: async () => {
      if (userId) {
        return await fetchUserMatches(userId);
      }
    },
    enabled: !!userId,
  });

  return { userMatches, fetchingUserMatches };
}

export default useUserMatchesQuery;
