import Page from "../animations/Page.tsx";
import useInterestsQuery from "../hooks/queries/useInterestsQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import InterestCard from "../components/card/InterestCard.tsx";
import useInterestSelection from "../hooks/useInterestSelection.ts";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useSignUpStore } from "../store/signUpStore.ts";
import useRegisterMutation from "../hooks/muatations/useRegisterMutation.ts";
import GoBackButton from "../components/button/GoBackButton.tsx";

const SignUpThirdStep = () => {
  const { setSignUpData, signUpData } = useSignUpStore();
  const { register, registering } = useRegisterMutation();
  const { interests, fetchingInterests } = useInterestsQuery();
  const { selectedInterests, selectInterest } = useInterestSelection(
    signUpData?.interests,
  );

  if (fetchingInterests || !interests || registering) {
    return <Spinner />;
  }

  const signUp = () => {
    setSignUpData({ interests: selectedInterests });
    register(useSignUpStore.getState().signUpData);
  };

  return (
    <Page>
      <div
        className={
          "w-[850px] gap-12 px-4 py-8 flex items-center flex-col h-auto border-2 border-pink-100 rounded-xl"
        }
      >
        <div
          className={"w-full h-auto flex justify-center items-center relative"}
        >
          <GoBackButton />
          <h1 className={"text-4xl text-white"}>
            Sign Up on{" "}
            <span className={"text-gradient font-bold"}>FlameLink</span>
          </h1>
        </div>
        <div
          className={
            "flex flex-col w-full h-auto gap-4 border-t-2 border-pink-100 pt-4"
          }
        >
          <h2 className={"text-3xl text-white self-center "}>
            Select your interests
          </h2>
          <div
            className={"w-full h-auto flex flex-wrap justify-around gap-3 py-8"}
          >
            {interests.map((interest, index) => (
              <InterestCard
                key={index}
                interestName={interest.interestName}
                isSelected={selectedInterests.includes(interest.interestName)}
                onClick={(data) => selectInterest(data)}
              />
            ))}
          </div>
        </div>

        <AnimatedButton
          onClick={() => signUp()}
          className={
            "w-full h-[65px] border-2 rounded-xl border-white cursor-pointer text-white text-2xl font-bold"
          }
          type={"submit"}
        >
          Sign Up
        </AnimatedButton>
      </div>
    </Page>
  );
};

export default SignUpThirdStep;
