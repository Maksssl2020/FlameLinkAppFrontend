import Page from "../../animations/Page.tsx";
import useAuthentication from "../../hooks/useAuthentication.ts";
import FormInput from "../../components/input/FormInput.tsx";
import AnimatedButton from "../../components/button/AnimatedButton.tsx";
import useInterestsQuery from "../../hooks/queries/useInterestsQuery.ts";
import Spinner from "../../components/spinner/Spinner.tsx";
import useCreateInterestMutation from "../../hooks/muatations/useCreateInterestMutation.ts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createInterestValidator } from "../../validators/interestValidator.ts";
import InterestCard from "../../components/card/InterestCard.tsx";
import SectionBanner from "../../components/banner/SectionBanner.tsx";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HiOutlineCheck } from "react-icons/hi2";
import SectionContainer from "../../components/section/SectionContainer.tsx";
import { motion } from "framer-motion";

const AdminInterestsManagement = () => {
  const authentication = useAuthentication();
  const { interests, fetchingInterests } = useInterestsQuery();
  const { createInterest, creatingInterest } = useCreateInterestMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createInterestValidator),
    defaultValues: {
      interestName: "",
    },
  });

  const onSubmit = async (data: { interestName: string }) => {
    try {
      createInterest(data.interestName);
      setSuccessMessage(
        `Interest "${data.interestName}" created successfully!`,
      );
      reset();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Failed to create interest:", error);
    }
  };

  if (fetchingInterests || creatingInterest) {
    return <Spinner />;
  }

  return (
    <Page className="bg-black-100 min-h-screen">
      <SectionContainer>
        <SectionBanner title="Manage Interests">
          <div className="flex items-center gap-2">
            <p className="text-white text-lg">
              Admin:{" "}
              <span className="text-pink-200 font-semibold">
                {authentication?.username}
              </span>
            </p>
            <AnimatePresence>
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-green-100 bg-black-200 px-4 py-2 rounded-lg border border-green-100"
                >
                  <HiOutlineCheck className="size-5" />
                  <span>{successMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SectionBanner>

        <div className="w-full max-w-6xl mx-auto bg-black-200 rounded-xl border-2 border-pink-100 shadow-lg shadow-pink-100/10 p-6">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl text-gradient font-bold mb-4">
                Existing Interests
              </h3>
              <div className="w-full p-4 flex gap-3 flex-wrap border-2 border-gray-200 rounded-xl bg-black-100 min-h-[300px] max-h-[500px] overflow-y-auto scrollbar">
                {interests && interests.length > 0 ? (
                  interests.map((interest, index) => (
                    <InterestCard
                      key={index}
                      interestName={interest.interestName}
                      isSelected={false}
                    />
                  ))
                ) : (
                  <p className="text-gray-300 w-full text-center py-8">
                    No interests found. Create your first one!
                  </p>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <h3 className="text-2xl text-gradient font-bold mb-4">
                Add New Interest
              </h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <FormInput
                  register={register("interestName")}
                  error={errors?.interestName?.message}
                  title="Interest name"
                  type="text"
                  formType="default"
                />

                <AnimatedButton
                  type="submit"
                  className="w-full h-[55px] bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold rounded-xl text-xl"
                  hoverBackgroundColor="#E80352"
                  hoverTextColor="#FFFFFF"
                >
                  Add Interest
                </AnimatedButton>
              </form>
            </div>
          </div>
        </div>
      </SectionContainer>
    </Page>
  );
};

export default AdminInterestsManagement;
