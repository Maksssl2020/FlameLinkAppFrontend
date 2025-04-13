import AnimatedButton from "../button/AnimatedButton.tsx";
import { IoCloseOutline } from "react-icons/io5";
import FormFileInput from "../input/FormFileInput.tsx";
import ImagePreview from "../image/ImagePreview.tsx";
import useUploadProfileMainPhotoMutation from "../../hooks/muatations/useUploadProfileMainPhotoMutation.ts";
import Spinner from "../spinner/Spinner.tsx";
import { useState } from "react";
import { ImageToPreviewProps } from "../../types/imageTypes.ts";
import useAuthentication from "../../hooks/useAuthentication.ts";

type UploadMainPhotoPanelProps = {
  onClose?: () => void;
};

const UploadMainPhotoPanel = ({ onClose }: UploadMainPhotoPanelProps) => {
  const [profileMainPhotoToUpload, setProfileMainPhotoToUpload] = useState<
    ImageToPreviewProps | undefined
  >(undefined);
  const { uploadProfileMainPhoto, uploadingProfileMainPhoto } =
    useUploadProfileMainPhotoMutation();
  const authentication = useAuthentication();

  if (uploadingProfileMainPhoto) {
    return <Spinner />;
  }

  const onSubmit = () => {
    if (profileMainPhotoToUpload && authentication?.userId) {
      uploadProfileMainPhoto({
        userId: authentication.userId,
        photo: profileMainPhotoToUpload.file,
      });
    }
  };

  return (
    <div
      className={
        "w-[600px] gap-8 h-[500px] flex text-white flex-col bg-black-200 rounded-xl p-4 border-2 border-pink-100 bg-black-200"
      }
    >
      <div className={"relative"}>
        <h1 className={"text-3xl text-center font-bold"}>
          Upload New Main Photo
        </h1>
        <AnimatedButton
          onClick={() => onClose?.()}
          className={
            "size-10 absolute right-0 top-0 rounded-full border-2 cursor-pointer text-white"
          }
        >
          <IoCloseOutline className={"size-7"} />
        </AnimatedButton>
      </div>
      <div className={"w-full flex gap-4"}>
        <FormFileInput
          title={""}
          onChange={(value) => {
            if (value) {
              setProfileMainPhotoToUpload({
                src: URL.createObjectURL(value),
                file: value,
              });
            }
          }}
        />
        <ImagePreview
          image={profileMainPhotoToUpload?.src}
          alt={"profile-main-photo-to-upload"}
          key={"profile-main-photo-to-upload-key"}
        />
      </div>
      <div className={"flex gap-4"}>
        <AnimatedButton
          onClick={() => onClose?.()}
          className={
            "w-full h-[55px] border-2 rounded-xl cursor-pointer uppercase font-bold text-xl"
          }
        >
          Cancel
        </AnimatedButton>
        <AnimatedButton
          onClick={onSubmit}
          className={
            "w-full h-[55px] border-2 rounded-xl cursor-pointer uppercase font-bold text-xl"
          }
        >
          Upload
        </AnimatedButton>
      </div>
    </div>
  );
};

export default UploadMainPhotoPanel;
