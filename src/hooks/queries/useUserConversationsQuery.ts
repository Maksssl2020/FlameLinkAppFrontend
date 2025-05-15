import useAuthentication from "../useAuthentication.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchUserConversations } from "../../api/conversations-api.ts";

function useUserConversationsQuery() {
  const { userId } = useAuthentication();

  const { data: userConversations, isLoading: fetchingUserConversations } =
    useQuery({
      queryKey: ["userConversations", userId],
      queryFn: () => {
        if (userId) {
          return fetchUserConversations(userId);
        }
      },
      enabled: userId !== undefined && userId !== null,
    });

  return { userConversations, fetchingUserConversations };
}

export default useUserConversationsQuery;
