import { UserParams } from "../../types/userTypes.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchMatchingUsers } from "../../api/users-api.ts";
import { useAuthStore } from "../../store/authStore.ts";

function useMatchingUsersQuery(params: UserParams) {
  const { userId } = useAuthStore.getState().authentication;

  const { data: matchingUsers, isLoading: fetchingMatchingUsers } = useQuery({
    queryKey: ["matchingUsers", params, userId],
    queryFn: () => fetchMatchingUsers(params),
    // enabled: !!params.userUsername,
  });

  return { matchingUsers, fetchingMatchingUsers };
}

export default useMatchingUsersQuery;
