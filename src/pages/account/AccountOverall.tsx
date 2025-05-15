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
import AnimatedButton from "../../components/button/AnimatedButton.tsx";
import { UserDataToUpdate } from "../../types/userTypes.ts";
import useUpdateAccountDataMutation from "../../hooks/muatations/useUpdateAccountDataMutation.ts";

const emptyUserData = {
  email: "",
  firstName: "",
  lastName: "",
  city: "",
  country: "",
};

const AccountOverall = () => {
  const [initialUserData, setInitialUserData] =
    useState<UserDataToUpdate>(emptyUserData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const authentication = useAuthentication();
  const { user, fetchingUser } = useUserByIdQuery(
    authentication?.userId || undefined,
  );
  const [isChange, setIsChange] = useState(false);
  const { updateAccountData, updatingAccountData } =
    useUpdateAccountDataMutation();

  const { register, setValue, handleSubmit, watch } = useForm();
  const watchedValues = watch();

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

      setInitialUserData({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.city,
        country: user.country,
      });
    }
  }, [user]);

  useEffect(() => {
    const hasChanges =
      watchedValues.email !== initialUserData.email ||
      watchedValues.firstName !== initialUserData.firstName ||
      watchedValues.lastName !== initialUserData.lastName ||
      watchedValues.city !== initialUserData.city ||
      watchedValues.country !== initialUserData.country;

    setIsChange(hasChanges);
  }, [watchedValues, initialUserData]);

  if (fetchingUser || !user || updatingAccountData) {
    return <Spinner />;
  }

  const onSubmit = (data: UserDataToUpdate) => {
    updateAccountData({
      initialData: initialUserData,
      dataToUpdate: data,
    });
  };

  return (
    <Page className="bg-black-100 min-h-screen">
      <SectionContainer>
        <SectionBanner title="Manage your account" />

        <div className="w-full max-w-6xl mx-auto bg-black-200 rounded-xl border-2 border-pink-100 shadow-lg shadow-pink-100/10 p-6">
          <form
            onSubmit={handleSubmit((data) =>
              onSubmit({
                city: data.city,
                country: data.country,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
              }),
            )}
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
                  readOnly={true}
                />
                <FormInput
                  title="Last Name"
                  type="text"
                  formType="account"
                  register={register("lastName")}
                  readOnly={true}
                />
                <FormInput
                  title="City"
                  type="text"
                  formType="account"
                  register={register("city")}
                  readOnly={true}
                />
                <FormInput
                  title="Country"
                  type="text"
                  formType="account"
                  register={register("country")}
                  readOnly={true}
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
                  {isChange && (
                    <AnimatedButton
                      type="submit"
                      className="w-full mb-[55px] h-[55px] bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold rounded-xl text-xl"
                      hoverBackgroundColor="#E80352"
                      hoverTextColor="#FFFFFF"
                    >
                      Save Changes
                    </AnimatedButton>
                  )}
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
