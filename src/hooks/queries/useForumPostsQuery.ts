import { useQuery } from "@tanstack/react-query";
import { fetchForumPosts } from "../../api/fodum-posts-api.ts";

function useForumPostsQuery() {
  const { data: forumPosts, isLoading: fetchingForumPosts } = useQuery({
    queryKey: ["forumPostsData"],
    queryFn: () => fetchForumPosts(),
  });

  return { forumPosts, fetchingForumPosts };
}

export default useForumPostsQuery;
