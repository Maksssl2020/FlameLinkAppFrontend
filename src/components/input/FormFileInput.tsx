import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoCloudUploadOutline } from "react-icons/io5";

type FormFileInputProps = {
  title: string;
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

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    let filesArray = Array.from(newFiles);

    if (multiple) {
      filesArray = filesArray.slice(0, maxFiles);
      onChangeMultiple?.(filesArray);
    } else {
      onChange?.(filesArray[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDraggedOver(false);
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div className={"flex flex-col gap-4"}>
      <label className={"text-white ml-2 text-xl"}>{title}</label>
      <div className={"flex flex-col"}>
        <motion.label
          onDragOver={(event) => {
            event.preventDefault();
            setIsDraggedOver(true);
          }}
          onDragLeave={() => setIsDraggedOver(false)}
          onDrop={handleDrop}
          whileHover={{
            color: "#292929",
            borderColor: "#E80352",
            backgroundColor: "#E80352",
          }}
          animate={{
            color: isDraggedOver ? "#292929" : "#E6E6E6",
            borderColor: isDraggedOver
              ? "#E80352"
              : error
                ? "#FB2C36"
                : "#292929",
            backgroundColor: isDraggedOver ? "#E80352" : "#292929",
          }}
          htmlFor={"fileInput"}
          className={`border-white text-white flex cursor-pointer items-center justify-center rounded-xl border-2 ${inputWidth} ${inputHeight}`}
        >
          <IoCloudUploadOutline className={"size-12 "} />
        </motion.label>
        <input
          id={"fileInput"}
          type={"file"}
          className={"h-0 w-0 border-none outline-none"}
          onChange={(event) => handleFiles(event.target.files)}
          multiple={multiple}
        />
      </div>
      <p className={"h-[35px] pt-3 pl-3 text-lg text-red-500"}>
        {error && error}
      </p>
    </div>
  );
};

export default FormFileInput;
