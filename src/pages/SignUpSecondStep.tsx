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
  const { setSignUpData } = useSignUpStore();
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSecondStepData>({
    resolver: yupResolver(signUpSecondStepValidator),
    defaultValues: {
      dateOfBirth: new Date(),
      gender: "Male",
      preference: "Males",
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
    <Page>
      <div
        className={
          "w-[700px] gap-12 px-4 py-8 flex items-center flex-col h-auto border-2 border-pink-100 rounded-xl"
        }
      >
        <h1 className={"text-4xl text-white"}>
          Sign Up on{" "}
          <span className={"text-gradient font-bold"}>FlameLink</span>
        </h1>
        <div className={"flex flex-col w-full h-auto gap-4"}>
          <DatePickerInput
            title={"Date of birth"}
            onChange={onDateOfBirthChange}
            error={errors?.dateOfBirth?.message}
          />
          <ThreeButtonsSelect
            title={"Gender"}
            options={genderOptions}
            onClick={onGenderChange}
            chosenValue={watch("gender")}
          />
          <ThreeButtonsSelect
            title={"Preference"}
            options={preferenceOptions}
            onClick={onPreferenceChange}
            chosenValue={watch("preference")}
          />

          <AnimatedButton
            onClick={handleSubmit(onNextStep)}
            type={"submit"}
            className={
              "w-full h-[50px] mt-8 bg-white rounded-xl text-2xl cursor-pointer font-bold uppercase"
            }
          >
            Continue
          </AnimatedButton>
        </div>
      </div>
    </Page>
  );
};

export default SignUpSecondStep;
