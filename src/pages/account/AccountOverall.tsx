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
import { HiOutlineShieldCheck } from "react-icons/hi";
import { motion } from "framer-motion";
import AnimatedButton from "../../components/button/AnimatedButton.tsx";

const AccountOverall = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
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
    <Page className="bg-black-100 min-h-screen">
      <SectionContainer>
        <SectionBanner title="Manage your account">
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-green-100 bg-black-200 px-4 py-2 rounded-lg border border-green-100"
            >
              <HiOutlineShieldCheck className="size-5" />
              <span>Changes saved successfully</span>
            </motion.div>
          )}
        </SectionBanner>

        <div className="w-full max-w-6xl mx-auto bg-black-200 rounded-xl border-2 border-pink-100 shadow-lg shadow-pink-100/10 p-6">
          <form
            onSubmit={handleSubmit((data) => {
              // Simulate saving data
              setTimeout(() => {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
              }, 500);
            })}
            className="w-full"
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
              <div className="w-full h-auto flex flex-col gap-6">
                <h3 className="text-2xl text-gradient font-bold">
                  Personal Information
                </h3>
                <FormInput
                  title="E-mail"
                  type="text"
                  formType="account"
                  register={register("email")}
                  readOnly={true}
                />
                <FormInput
                  title="Password"
                  type="password"
                  formType="account"
                  defaultValue="••••••••••"
                  readOnly={true}
                  canShowPassword={false}
                  onEditClick={() => setIsModalOpen(true)}
                />
                <FormInput
                  title="First Name"
                  type="text"
                  formType="account"
                  register={register("firstName")}
                  readOnly={false}
                />
                <FormInput
                  title="Last Name"
                  type="text"
                  formType="account"
                  register={register("lastName")}
                  readOnly={false}
                />
                <FormInput
                  title="City"
                  type="text"
                  formType="account"
                  register={register("city")}
                  readOnly={false}
                />
                <FormInput
                  title="Country"
                  type="text"
                  formType="account"
                  register={register("country")}
                  readOnly={false}
                />
              </div>

              <div className="w-full h-auto flex flex-col gap-6">
                <h3 className="text-2xl text-gradient font-bold">
                  Account Information
                </h3>
                <FormInput
                  title="Username"
                  type="text"
                  formType="immutable"
                  register={register("userName")}
                  readOnly={true}
                />
                <FormInput
                  title="Gender"
                  type="text"
                  formType="immutable"
                  register={register("gender")}
                  readOnly={true}
                />
                <FormInput
                  title="Date of Birth"
                  type="text"
                  formType="immutable"
                  register={register("dateOfBirth")}
                  readOnly={true}
                />
                <FormInput
                  title="Joined at"
                  type="text"
                  formType="immutable"
                  register={register("createdAt")}
                  readOnly={true}
                />

                <div className="mt-auto pt-6">
                  <AnimatedButton
                    type="submit"
                    className="w-full h-[55px] bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold rounded-xl text-xl"
                    hoverBackgroundColor="#E80352"
                    hoverTextColor="#FFFFFF"
                  >
                    Save Changes
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </form>
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
