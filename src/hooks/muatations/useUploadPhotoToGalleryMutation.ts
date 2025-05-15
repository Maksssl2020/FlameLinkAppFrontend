import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadProfilePhotoRequest } from "../../types/userProfileTypes.ts";
import { handleUploadPhotoToGallery } from "../../api/users-profiles-api.ts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../types/types.ts";

function useUploadPhotoToGalleryMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: uploadPhotoToGallery, isPending: uploadingPhotoToGallery } =
    useMutation({
      mutationKey: ["uploadProfileMainPhoto"],
      mutationFn: (data: UploadProfilePhotoRequest) =>
        handleUploadPhotoToGallery(data),
      onSuccess: (_, variables) => {
        toast.success("Upload profile photo successfully.");
        onSuccess?.();

        queryClient.invalidateQueries({
          queryKey: ["userProfile", variables.userId],
        });
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { uploadPhotoToGallery, uploadingPhotoToGallery };
}

export default useUploadPhotoToGalleryMutation;
