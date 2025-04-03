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

const AdminInterestsManagement = () => {
  const authentication = useAuthentication();
  const { interests, fetchingInterests } = useInterestsQuery();
  const { createInterest, creatingInterest } = useCreateInterestMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createInterestValidator),
    defaultValues: {
      interestName: "",
    },
  });

  if (fetchingInterests || creatingInterest) {
    return <Spinner />;
  }

  return (
    <Page>
      <div className={"w-full flex flex-col items-center h-auto gap-12"}>
        <SectionBanner title={"Manage Interests"}>
          <p className={"text-white text-xl"}>
            You're logged in as:{" "}
            <span className={"text-pink-400"}>{authentication?.username}</span>
          </p>
        </SectionBanner>

        <div className={"flex justify-center gap-16 w-full h-full"}>
          <div className={"w-[600px] h-full flex flex-col gap-4"}>
            <label className={"ml-2 text-xl text-white"}>
              Existing interests
            </label>
            <div
              className={
                "w-full p-4 flex gap-2 flex-wrap overflow-y-auto h-[525px] border-2 border-gray-300 rounded-xl"
              }
            >
              {interests?.map((interest, index) => (
                <InterestCard
                  key={index}
                  interestName={interest.interestName}
                  isSelected={false}
                />
              ))}
            </div>
          </div>
          <div className={"flex flex-col w-[450px] gap-8"}>
            <FormInput
              register={register("interestName")}
              error={errors?.interestName?.message}
              title={"Interest name"}
              type={"text"}
            />

            <AnimatedButton
              onClick={handleSubmit((data) =>
                createInterest(data.interestName),
              )}
              className={
                "w-full h-[50px] uppercase  bg-white text-xl font-bold  rounded-xl border-2 cursor-pointer"
              }
            >
              Add new interest
            </AnimatedButton>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AdminInterestsManagement;
