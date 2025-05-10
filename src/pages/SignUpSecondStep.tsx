import Page from "../animations/Page.tsx";
import DatePickerInput from "../components/input/DatePickerInput.tsx";
import { useForm } from "react-hook-form";
import ThreeButtonsSelect from "../components/select/ThreeButtonsSelect.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useNavigate } from "react-router-dom";
import { useSignUpStore } from "../store/signUpStore.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSecondStepValidator } from "../validators/signUpValidator.ts";
import { SignUpSecondStepData } from "../types/types.ts";
import FormInput from "../components/input/FormInput.tsx";
import GoBackButton from "../components/button/GoBackButton.tsx";

const genderOptions: SignUpSecondStepData["gender"][] = [
  "Male",
  "Female",
  "Other",
];
const preferenceOptions: SignUpSecondStepData["preference"][] = [
  "Males",
  "Females",
  "Both",
];

const SignUpSecondStep = () => {
  const navigate = useNavigate();
  const { setSignUpData, signUpData } = useSignUpStore();

  const {
    setValue,
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpSecondStepData>({
    // @ts-ignore
    resolver: yupResolver(signUpSecondStepValidator),
    defaultValues: {
      country: signUpData.country,
      city: signUpData.city,
      dateOfBirth: signUpData.dateOfBirth ?? null,
      gender: signUpData.gender,
      preference: signUpData.preference,
    },
  });

  const onDateOfBirthChange = (date: Date) => {
    setValue("dateOfBirth", date);
  };

  const onGenderChange = (gender: "Male" | "Female" | "Other") => {
    setValue("gender", gender);
  };

  const onPreferenceChange = (preference: "Males" | "Females" | "Both") => {
    setValue("preference", preference);
  };

  const onNextStep = (data: SignUpSecondStepData) => {
    setSignUpData(data);
    navigate("/sign-up/step/3");
  };

  return (
    <Page className="bg-black-100 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[700px] gap-10 px-6 py-10 flex items-center flex-col h-auto border-2 border-pink-100 rounded-xl bg-black-200 shadow-lg shadow-pink-100/10">
        <div className="w-full h-auto flex relative justify-center">
          <GoBackButton />
          <h1 className="text-4xl md:text-5xl text-white font-bold">
            Sign Up on{" "}
            <span className="text-gradient font-bold">FlameLink</span>
          </h1>
        </div>
        <div className="flex flex-col w-full h-auto gap-5">
          <FormInput
            title="Country"
            type="text"
            register={register("country")}
            error={errors?.country?.message}
          />
          <FormInput
            title="City"
            type="text"
            register={register("city")}
            error={errors?.city?.message}
          />
          <DatePickerInput
            initSelectedDate={signUpData.dateOfBirth}
            title="Date of birth"
            onChange={onDateOfBirthChange}
            error={errors?.dateOfBirth?.message}
          />
          <ThreeButtonsSelect
            title="Gender"
            options={genderOptions}
            onClick={onGenderChange}
            chosenValue={watch("gender")}
          />
          <ThreeButtonsSelect
            title="Preference"
            options={preferenceOptions}
            onClick={onPreferenceChange}
            chosenValue={watch("preference")}
          />

          <AnimatedButton
            onClick={handleSubmit(onNextStep)}
            type="submit"
            className="w-full h-[55px] mt-8 bg-white rounded-xl text-2xl cursor-pointer font-bold uppercase transition-all"
            hoverBackgroundColor="#E80352"
            hoverTextColor="#FFFFFF"
          >
            Continue
          </AnimatedButton>
        </div>
      </div>
    </Page>
  );
};

export default SignUpSecondStep;
