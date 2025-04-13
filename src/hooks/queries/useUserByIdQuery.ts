import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../../api/users-api.ts";

function useUserByIdQuery(id: number | undefined) {
  const { data: user, isLoading: fetchingUser } = useQuery({
    queryKey: ["userData", id],
    queryFn: () => {
      if (id !== undefined) {
        return fetchUserById(id);
      }
    },
    enabled: id !== undefined,
  });

  return { user, fetchingUser };
}

export default useUserByIdQuery;
