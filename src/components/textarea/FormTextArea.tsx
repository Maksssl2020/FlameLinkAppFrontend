import { UseFormRegisterReturn } from "react-hook-form";
import { motion } from "framer-motion";

type FormTextAreaProps = {
  title: string;
  error?: string;
  register?: UseFormRegisterReturn<string>;
  width?: string;
  height?: string;
  onChange?: (value: string) => void;
};

const FormTextArea = ({
  title,
  error,
  register,
  width = "w-auto",
  height = "h-[250px]",
  onChange,
}: FormTextAreaProps) => {
  return (
    <div className={"flex flex-col gap-4"}>
      <label className={"text-white ml-2 text-xl"}>{title}</label>
      <motion.textarea
        whileFocus={{ borderColor: "#E80352" }}
        animate={
          error ? { borderColor: "#FB2C36" } : { borderColor: "#292929" }
        }
        onChange={(event) => onChange?.(event.target.value)}
        className={`text-white bg-gray-200 resize-none rounded-xl border-2 p-2 text-xl outline-none ${width} ${height}`}
        {...register}
      />
      <p className={"h-[35px] pt-3 pl-3 text-lg text-red-500"}>
        {error && error}
      </p>
    </div>
  );
};

export default FormTextArea;
