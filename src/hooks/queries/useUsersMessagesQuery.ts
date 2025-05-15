import { useQuery } from "@tanstack/react-query";
import useAuthentication from "../useAuthentication.ts";
import { fetchUsersMessages } from "../../api/messages-api.ts";

function useUsersMessagesQuery(recipientId: string | number) {
  const { userId } = useAuthentication();

  const { data: usersMessages, isLoading: fetchingUsersMessages } = useQuery({
    queryKey: ["usersMessagesQuery", userId],
    queryFn: async () => {
      if (userId && recipientId) {
        return await fetchUsersMessages(userId, recipientId);
      }
    },
    enabled:
      userId !== undefined && userId !== null && recipientId !== undefined,
  });

  return { usersMessages, fetchingUsersMessages };
}

export default useUsersMessagesQuery;
