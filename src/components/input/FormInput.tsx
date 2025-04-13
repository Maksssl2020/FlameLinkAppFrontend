import { motion } from "framer-motion";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlinePencil,
} from "react-icons/hi2";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  title: string;
  type: "text" | "password" | "email";
  formType: "account" | "default" | "immutable";
  defaultValue?: string;
  error?: string;
  register?: UseFormRegisterReturn<string>;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  canShowPassword?: boolean;
  onEditClick?: () => void;
};

const FormInput = ({
  title,
  type,
  register,
  onChange,
  error,
  readOnly = false,
  formType = "default",
  defaultValue = undefined,
  canShowPassword = true,
  onEditClick = undefined,
}: FormInputProps) => {
  const [isReadOnly, setIsReadOnly] = useState(readOnly);
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
          defaultValue={defaultValue}
          onChange={(event) => onChange?.(event.target.value)}
          whileFocus={{
            borderColor: "#E80352",
          }}
          style={{
            borderColor: "#292929",
          }}
          animate={error ? { borderColor: "#fb2c36" } : {}}
          type={inputType}
          readOnly={isReadOnly}
          disabled={isReadOnly}
          className={
            "w-full bg-gray-200 px-2 h-full border-2 rounded-xl outline-none"
          }
          {...register}
        />
        {type === "password" && canShowPassword && (
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
        {formType === "account" && (
          <motion.button
            animate={isReadOnly ? { color: "#565656" } : { color: "#FE5487" }}
            type={"button"}
            onClick={() => {
              if (type !== "password") {
                setIsReadOnly(!isReadOnly);
              } else {
                onEditClick?.();
              }
            }}
            className={
              "absolute right-0 cursor-pointer size-10 flex items-center justify-center text-pink-200"
            }
          >
            <HiOutlinePencil className={"size-7"} />
          </motion.button>
        )}
      </div>
      <p className={"text-lg text-red-500 h-[35px]"}>{error && error}</p>
    </div>
  );
};

export default FormInput;
