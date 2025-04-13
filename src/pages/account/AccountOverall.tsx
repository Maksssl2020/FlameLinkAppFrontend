import Page from "../../animations/Page.tsx";
import SectionBanner from "../../components/banner/SectionBanner.tsx";
import FormInput from "../../components/input/FormInput.tsx";
import useUserByIdQuery from "../../hooks/queries/useUserByIdQuery.ts";
import useAuthentication from "../../hooks/useAuthentication.ts";
import Spinner from "../../components/spinner/Spinner.tsx";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import SectionContainer from "../../components/section/SectionContainer.tsx";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/modal/Modal.tsx";
import ChangePasswordPanel from "../../components/panel/ChangePasswordPanel.tsx";

const AccountOverall = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authentication = useAuthentication();
  const { user, fetchingUser } = useUserByIdQuery(
    authentication?.userId || undefined,
  );

  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    if (user) {
      setValue("userName", user.userName);
      setValue("email", user.email);
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("gender", user.gender);
      setValue("preference", user.preference);
      setValue("city", user.city);
      setValue("country", user.country);
      setValue("dateOfBirth", user.dateOfBirth);
      setValue("createdAt", user.createdAt);
    }
  });

  if (fetchingUser || !user) {
    return <Spinner />;
  }

  return (
    <Page>
      <SectionContainer>
        <SectionBanner title={"Manage your account"} />
        <div
          className={
            "w-full h-[725px] grid grid-cols-2 gap-8 overflow-y-auto scrollbar"
          }
        >
          <div className={"w-full h-auto flex flex-col"}>
            <FormInput
              title={"E-mail"}
              type={"text"}
              formType={"account"}
              register={register("email")}
              readOnly={true}
            />
            <FormInput
              title={"Password"}
              type={"password"}
              formType={"account"}
              defaultValue={"1234567890"}
              readOnly={true}
              canShowPassword={false}
              onEditClick={() => setIsModalOpen(true)}
            />
            <FormInput
              title={"First Name"}
              type={"text"}
              formType={"account"}
              register={register("firstName")}
              readOnly={true}
            />
            <FormInput
              title={"Last Name"}
              type={"text"}
              formType={"account"}
              register={register("firstName")}
              readOnly={true}
            />
            <FormInput
              title={"City"}
              type={"text"}
              formType={"account"}
              register={register("city")}
              readOnly={true}
            />
            <FormInput
              title={"Country"}
              type={"text"}
              formType={"account"}
              register={register("country")}
              readOnly={true}
            />
          </div>
          <div className={"w-full h-auto flex flex-col"}>
            <FormInput
              title={"Username"}
              type={"text"}
              formType={"immutable"}
              register={register("userName")}
              readOnly={true}
            />
            <FormInput
              title={"Gender"}
              type={"text"}
              formType={"immutable"}
              register={register("gender")}
              readOnly={true}
            />
            <FormInput
              title={"Date of Birth"}
              type={"text"}
              formType={"immutable"}
              register={register("dateOfBirth")}
              readOnly={true}
            />
            <FormInput
              title={"Joined at"}
              type={"text"}
              formType={"immutable"}
              register={register("createdAt")}
              readOnly={true}
            />
          </div>
        </div>
      </SectionContainer>
      <AnimatePresence>
        {isModalOpen && (
          <Modal>
            <ChangePasswordPanel onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </Page>
  );
};

export default AccountOverall;
