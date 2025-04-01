import { motion } from "framer-motion";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  title: string;
  type: "text" | "password" | "email";
  error?: string;
  register?: UseFormRegisterReturn<string>;
  onChange?: (value: string) => void;
};

const FormInput = ({
  title,
  type,
  register,
  onChange,
  error,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleButtonClick = () => {
    if (type === "password" && showPassword) {
      setShowPassword(false);
      setInputType("password");
    } else if (type === "password" && !showPassword) {
      setShowPassword(true);
      setInputType("text");
    }
  };

  return (
    <div className={"flex flex-col gap-3 text-white w-auto h-auto"}>
      <label className={"ml-2 text-xl"}>{title}</label>
      <div className={"w-full flex items-center h-[50px] relative"}>
        <motion.input
          onChange={(event) => onChange?.(event.target.value)}
          whileFocus={{
            borderColor: "#E80352",
          }}
          style={{
            borderColor: "#292929",
          }}
          animate={error ? { borderColor: "#fb2c36" } : {}}
          type={inputType}
          className={
            "w-full bg-gray-200 px-2 h-full border-2 rounded-xl outline-none"
          }
          {...register}
        />
        {type === "password" && (
          <button
            type={"button"}
            onClick={handleButtonClick}
            className={
              "absolute right-0 size-10 flex items-center justify-center text-pink-200"
            }
          >
            {showPassword ? (
              <HiOutlineEyeSlash className={"size-7"} />
            ) : (
              <HiOutlineEye className={"size-7"} />
            )}
          </button>
        )}
      </div>
      <p className={"text-lg text-red-500 h-[35px]"}>{error && error}</p>
    </div>
  );
};

export default FormInput;
