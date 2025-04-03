import { motion } from "framer-motion";

type ImagePreviewProps = {
  height?: string;
  width?: string;
  image: string | undefined;
  alt: string | undefined;
  key: number | string;
};

const ImagePreview = ({
  image,
  alt,
  key,
  width = "w-full",
  height = "h-[250px]",
}: ImagePreviewProps) => {
  return (
    <div
      className={`border-white bg-gray-200 mb-1 overflow-hidden rounded-xl  ${width} ${height}`}
    >
      {image && (
        <motion.img
          key={key}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className={"h-full w-full rounded-xl object-cover"}
          src={image}
          alt={alt}
        />
      )}
    </div>
  );
};

export default ImagePreview;
