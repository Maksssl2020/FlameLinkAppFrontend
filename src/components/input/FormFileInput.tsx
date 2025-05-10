import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoCloudUploadOutline } from "react-icons/io5";
import { HiOutlineDocumentAdd, HiOutlineX } from "react-icons/hi";

type FormFileInputProps = {
  title?: string;
  error?: string;
  inputWidth?: string;
  inputHeight?: string;
  onChange?: (value: File | undefined) => void;
  onChangeMultiple?: (value: File[] | undefined) => void;
  multiple?: boolean;
  maxFiles?: number;
};

const FormFileInput = ({
  title,
  error,
  onChange,
  onChangeMultiple,
  inputWidth = "w-[150px]",
  inputHeight = "h-[250px]",
  multiple = false,
  maxFiles = 3,
}: FormFileInputProps) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return;

    const filesArray = Array.from(newFiles);

    if (multiple) {
      const combinedFiles = [...selectedFiles, ...filesArray].slice(
        0,
        maxFiles,
      );
      setSelectedFiles(combinedFiles);
      onChangeMultiple?.(combinedFiles);
    } else {
      setSelectedFiles([filesArray[0]]);
      onChange?.(filesArray[0]);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    if (multiple) {
      onChangeMultiple?.(updatedFiles.length > 0 ? updatedFiles : undefined);
    } else {
      onChange?.(updatedFiles.length > 0 ? updatedFiles[0] : undefined);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDraggedOver(false);
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      {title && (
        <label className="text-white text-lg font-medium">{title}</label>
      )}
      <div className="flex flex-col gap-3">
        <motion.label
          onDragOver={(event) => {
            event.preventDefault();
            setIsDraggedOver(true);
          }}
          onDragLeave={() => setIsDraggedOver(false)}
          onDrop={handleDrop}
          whileHover={{ borderColor: "#FE5487" }}
          animate={{
            borderColor: isDraggedOver
              ? "#FE5487"
              : error
                ? "#FB2C36"
                : "#292929",
            backgroundColor: isDraggedOver
              ? "rgba(254, 84, 135, 0.1)"
              : "transparent",
          }}
          htmlFor="fileInput"
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed cursor-pointer ${inputWidth} ${inputHeight} bg-black-100`}
        >
          <IoCloudUploadOutline className="size-10 text-pink-200 mb-2" />
          <p className="text-white text-sm text-center px-2">
            {multiple
              ? "Drop files here or click to browse"
              : "Drop file here or click to browse"}
          </p>
        </motion.label>

        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
          multiple={multiple}
        />

        {selectedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-black-100 border border-gray-200 rounded-lg px-3 py-1"
              >
                <HiOutlineDocumentAdd className="size-4 text-pink-200" />
                <span className="text-white text-sm truncate max-w-[150px]">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-gray-300 hover:text-pink-200"
                >
                  <HiOutlineX className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormFileInput;
