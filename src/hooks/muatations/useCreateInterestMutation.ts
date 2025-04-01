import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleCreateInterest } from "../../api/interests-api.ts";
import toast from "react-hot-toast";

function useCreateInterestMutation() {
  const queryClient = useQueryClient();

  const { mutate: createInterest, isPending: creatingInterest } = useMutation({
    mutationKey: ["createInterest"],
    mutationFn: (data: string) => handleCreateInterest(data),
    onSuccess: () => {
      toast.success("Interest successfully created!");

      // @ts-ignore
      queryClient.invalidateQueries("interestsData");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createInterest, creatingInterest };
}

export default useCreateInterestMutation;
