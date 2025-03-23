import Page from "../animations/Page.tsx";
import FormInput from "../components/input/FormInput.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignUpStore } from "../store/signUpStore.ts";
import { SignUpFirstStepData } from "../types/types.ts";
import { signUpFirstStepValidator } from "../validators/signUpValidator.ts";

const SignUpFirstStep = () => {
  const navigate = useNavigate();
  const { setSignUpData } = useSignUpStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpFirstStepValidator),
  });

  const onNextStep = (data: SignUpFirstStepData) => {
    setSignUpData(data);
    navigate("/sign-up/step/2");
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
        <form
          onSubmit={handleSubmit(onNextStep)}
          className={"flex flex-col w-full h-auto gap-4"}
        >
          <FormInput
            title={"Username"}
            type={"text"}
            register={register("username")}
            error={errors?.username?.message}
          />
          <FormInput
            title={"First name"}
            type={"text"}
            register={register("firstName")}
            error={errors?.firstName?.message}
          />
          <FormInput
            title={"Last name"}
            type={"text"}
            register={register("lastName")}
            error={errors?.lastName?.message}
          />
          <FormInput
            title={"E-mail address"}
            type={"email"}
            register={register("email")}
            error={errors?.email?.message}
          />
          <FormInput
            title={"Password"}
            type={"password"}
            register={register("password")}
            error={errors?.password?.message}
          />
          <FormInput
            title={"Confirm password"}
            type={"password"}
            register={register("confirmPassword")}
            error={errors?.confirmPassword?.message}
          />

          <div
            className={"w-full h-auto gap-3 flex flex-col justify-center mt-8"}
          >
            <AnimatedButton
              type={"submit"}
              className={
                "w-full h-[50px] bg-white rounded-xl text-2xl cursor-pointer font-bold uppercase"
              }
            >
              Continue
            </AnimatedButton>
            <p className={"text-white text-center text-lg"}>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/sign-in")}
                className={"underline font-bold text-pink-200 cursor-pointer"}
              >
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div>
    </Page>
  );
};

export default SignUpFirstStep;
