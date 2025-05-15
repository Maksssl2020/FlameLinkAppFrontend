import { useState } from "react";
import toast from "react-hot-toast";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { IoCloseOutline } from "react-icons/io5";
import FormFileInput from "../input/FormFileInput.tsx";
import ImagePreview from "../image/ImagePreview.tsx";
import { ImageToPreviewProps } from "../../types/imageTypes.ts";
import useUploadPhotoToGalleryMutation from "../../hooks/muatations/useUploadPhotoToGalleryMutation.ts";
import Spinner from "../spinner/Spinner.tsx";
import useAuthentication from "../../hooks/useAuthentication.ts";

type UploadGalleryPanelProps = {
  onClose: () => void;
  currentPhotoCount: number;
};

const UploadGalleryPanel = ({
  onClose,
  currentPhotoCount,
}: UploadGalleryPanelProps) => {
  const { userId } = useAuthentication();
  const [files, setFiles] = useState<ImageToPreviewProps[]>([]);
  const selectedFiles = files.map((file) => file.file);
  const { uploadPhotoToGallery, uploadingPhotoToGallery } =
    useUploadPhotoToGalleryMutation();

  const handleFileChange = (data: File[]) => {
    const selected = Array.from(data || []);
    const maxAvailable = 6 - currentPhotoCount - files.length;

    if (maxAvailable <= 0) {
      toast.error("You've reached the maximum number of photos.");
      return;
    }

    if (selected.length > maxAvailable) {
      toast.error(`You can add only ${maxAvailable} more photo(s).`);
      return;
    }

    const mappedFiles = selected.map((file) => ({
      src: URL.createObjectURL(file),
      file: file,
    }));

    setFiles((prev) =>
      [...prev, ...mappedFiles].slice(0, 6 - currentPhotoCount),
    );
  };

  const removeImage = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const onSubmit = () => {
    if (files.length === 0 || !userId) return;

    for (const file of files) {
      uploadPhotoToGallery({
        userId,
        photo: file.file,
      });
    }

    toast.success("All photos uploaded successfully!");
    onClose();
  };

  if (uploadingPhotoToGallery) {
    return <Spinner />;
  }

  return (
    <div
      className={
        "w-auto gap-8 min-h-[500px] flex text-white flex-col bg-black-200 rounded-xl p-4 border-2 border-pink-100 bg-black-200"
      }
    >
      <div className="relative">
        <h1 className="text-3xl text-center font-bold">
          Upload New Photos ({files.length}/{6 - currentPhotoCount} selected)
        </h1>
        <AnimatedButton
          onClick={onClose}
          className="size-10 absolute right-0 top-0 rounded-full border-2 cursor-pointer text-white"
        >
          <IoCloseOutline className="size-7" />
        </AnimatedButton>
      </div>
      <div className={"w-full flex gap-4 h-auto"}>
        <div className={"w-[250px]"}>
          <FormFileInput
            title={""}
            inputWidth={"w-[250px]"}
            inputHeight={"h-[200px]"}
            multiple={true}
            selectedFiles={selectedFiles}
            onRemove={removeImage}
            onChangeMultiple={(value) => {
              if (value) {
                handleFileChange(value);
              }
            }}
          />
        </div>
        <div className="w-[500px] h-[400px] grid gap-4 grid-cols-3 overflow-y-auto">
          {files.map((file, index) => (
            <div key={`${index}`} className="relative">
              <ImagePreview
                width="w-full"
                height="h-[150px]"
                image={file?.src}
                alt={`${index}`}
                key={`${index}-${file.file}`}
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black-200 rounded-full p-1 hover:bg-pink-100 transition-colors"
              >
                <IoCloseOutline className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex gap-4 h-[50px]">
        <AnimatedButton
          className={`w-full h-full rounded-lg border-2 uppercase ${
            files.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={files.length === 0}
          onClick={onSubmit}
        >
          Upload
        </AnimatedButton>
        <AnimatedButton
          className="w-full h-full rounded-lg border-2 uppercase"
          onClick={onClose}
        >
          Cancel
        </AnimatedButton>
      </div>
    </div>
  );
};

export default UploadGalleryPanel;
