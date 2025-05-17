import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDeletePhotoFromProfile } from "../../api/users-profiles-api.ts";
import toast from "react-hot-toast";
import useAuthentication from "../useAuthentication.ts";
import { AxiosError } from "axios";

function useDeletePhotoMutation(onSuccess?: () => void) {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: deletePhoto, isPending: deletingPhoto } = useMutation({
    mutationKey: ["deletePhotoFromProfile"],
    mutationFn: (photoId: string | number) =>
      handleDeletePhotoFromProfile(photoId),
    onSuccess: () => {
      toast.success("Photo deleted successfully!");
      onSuccess?.();

      queryClient.invalidateQueries({
        queryKey: ["userProfile", userId],
      });
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });

  return { deletePhoto, deletingPhoto };
}

export default useDeletePhotoMutation;
