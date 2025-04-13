import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadProfileMainPhotoRequest } from "../../types/userProfileTypes.ts";
import { handleUploadProfileMainPhoto } from "../../api/users-profiles-api.ts";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";
import useAuthentication from "../useAuthentication.ts";

function useUploadProfileMainPhotoMutation(onSuccess?: () => void) {
  const authentication = useAuthentication();
  const queryClient = useQueryClient();

  const {
    mutate: uploadProfileMainPhoto,
    isPending: uploadingProfileMainPhoto,
  } = useMutation({
    mutationKey: ["uploadProfileMainPhoto"],
    mutationFn: (data: UploadProfileMainPhotoRequest) =>
      handleUploadProfileMainPhoto(data),
    onSuccess: () => {
      toast.success("Upload profile photo successfully.");
      onSuccess?.();

      // @ts-ignore
      queryClient.invalidateQueries(["userProfile", authentication?.userId]);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { uploadProfileMainPhoto, uploadingProfileMainPhoto };
}

export default useUploadProfileMainPhotoMutation;
