import AnimatedButton from "../button/AnimatedButton.tsx";
import { IoCloseOutline } from "react-icons/io5";
import FormInput from "../input/FormInput.tsx";
import useChangePasswordMutation from "../../hooks/muatations/useChangePasswordMutation.ts";
import Spinner from "../spinner/Spinner.tsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordValidator } from "../../validators/accountValidator.ts";

type ChangePasswordPanelProps = {
  onClose?: () => void;
};

const ChangePasswordPanel = ({ onClose }: ChangePasswordPanelProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordValidator),
  });
  const { changePassword, changingPassword } = useChangePasswordMutation(() => {
    reset();
    onClose?.();
  });

  if (changingPassword) {
    return <Spinner />;
  }

  return (
    <div
      className={
        "w-[600px] gap-8 h-auto flex flex-col bg-black-200 rounded-xl p-4 border-2 border-pink-100 bg-black-200"
      }
    >
      <div
        className={"w-full h-auto flex relative justify-center items-center"}
      >
        <h1 className={"text-white text-3xl uppercase font-bold"}>
          Change Password
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
      <div className={"w-full h-auto flex flex-col"}>
        <FormInput
          title={"Enter current password"}
          type={"password"}
          formType={"default"}
          register={register("currentPassword")}
          error={errors?.currentPassword?.message}
        />
        <FormInput
          title={"Enter new password"}
          type={"password"}
          formType={"default"}
          register={register("newPassword")}
          error={errors?.newPassword?.message}
        />
        <FormInput
          title={"Retype new password"}
          type={"password"}
          formType={"default"}
          register={register("retypeNewPassword")}
          error={errors?.retypeNewPassword?.message}
        />
      </div>
      <AnimatedButton
        type={"button"}
        onClick={handleSubmit((data) =>
          changePassword({
            ...data,
          }),
        )}
        className={
          "min-h-[55px]  cursor-pointer rounded-xl bg-white text-gray-200 font-bold  uppercase text-xl"
        }
      >
        Change Password
      </AnimatedButton>
    </div>
  );
};

export default ChangePasswordPanel;
