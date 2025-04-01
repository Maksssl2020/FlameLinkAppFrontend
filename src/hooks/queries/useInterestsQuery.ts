import { useQuery } from "@tanstack/react-query";
import { fetchAllInterests } from "../../api/interests-api.ts";

function useInterestsQuery() {
  const { data: interests, isLoading: fetchingInterests } = useQuery({
    queryKey: ["interestData"],
    queryFn: () => fetchAllInterests(),
  });

  return { interests, fetchingInterests };
}

export default useInterestsQuery;
