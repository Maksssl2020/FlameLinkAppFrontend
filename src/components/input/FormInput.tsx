"use client";

import { motion } from "framer-motion";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlinePencil,
} from "react-icons/hi2";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  title: string;
  type: "text" | "password" | "email";
  formType: "account" | "default" | "immutable";
  defaultValue?: string;
  error?: string;
  register?: UseFormRegisterReturn;
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
  defaultValue,
  canShowPassword = true,
  onEditClick,
}: FormInputProps) => {
  const [isEditing, setIsEditing] = useState(!readOnly);
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "text");
  };

  const handleEditClick = () => {
    if (type === "password") {
      onEditClick?.();
    } else {
      setIsEditing(!isEditing);
    }
  };

  const getBorderColor = () => {
    if (error) return "#fb2c36";
    if (formType === "immutable") return "#292929";
    if (!isEditing) return "#292929";
    return "#FE5487";
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-white text-lg font-medium">{title}</label>
      <div className="relative">
        <motion.input
          defaultValue={defaultValue}
          onChange={(e) => onChange?.(e.target.value)}
          whileFocus={{ borderColor: "#E80352" }}
          initial={{ borderColor: getBorderColor() }}
          animate={{ borderColor: getBorderColor() }}
          type={inputType}
          readOnly={!isEditing || readOnly}
          disabled={!isEditing || readOnly}
          className={`w-full h-[55px] bg-black-100 border-2 rounded-xl px-4 text-white ${
            !isEditing || readOnly ? "opacity-80" : ""
          }`}
          {...register}
        />

        {type === "password" && canShowPassword && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-pink-200 transition-colors"
          >
            {showPassword ? (
              <HiOutlineEyeSlash className="size-5" />
            ) : (
              <HiOutlineEye className="size-5" />
            )}
          </button>
        )}

        {formType !== "immutable" && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleEditClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-pink-200 transition-colors"
          >
            <HiOutlinePencil className="size-5" />
          </motion.button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
