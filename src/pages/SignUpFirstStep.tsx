import Page from "../animations/Page.tsx";
import FormInput from "../components/input/FormInput.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignUpStore } from "../store/signUpStore.ts";
import { SignUpFirstStepData } from "../types/types.ts";
import { signUpFirstStepValidator } from "../validators/signUpValidator.ts";
import GoBackButton from "../components/button/GoBackButton.tsx";

const SignUpFirstStep = () => {
  const navigate = useNavigate();
  const { setSignUpData, signUpData } = useSignUpStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpFirstStepValidator),
    defaultValues: {
      username: signUpData.username,
      firstName: signUpData.firstName,
      lastName: signUpData.lastName,
      email: signUpData.email,
      password: signUpData.password,
      confirmPassword: signUpData.password,
    },
  });

  const onNextStep = (data: SignUpFirstStepData) => {
    setSignUpData(data);
    navigate("/sign-up/step/2");
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
        <form
          onSubmit={handleSubmit(onNextStep)}
          className="flex flex-col w-full h-auto gap-5"
        >
          <FormInput
            title="Username"
            type="text"
            register={register("username")}
            error={errors?.username?.message}
          />
          <FormInput
            title="First name"
            type="text"
            register={register("firstName")}
            error={errors?.firstName?.message}
          />
          <FormInput
            title="Last name"
            type="text"
            register={register("lastName")}
            error={errors?.lastName?.message}
          />
          <FormInput
            title="E-mail address"
            type="email"
            register={register("email")}
            error={errors?.email?.message}
          />
          <FormInput
            title="Password"
            type="password"
            register={register("password")}
            error={errors?.password?.message}
          />
          <FormInput
            title="Confirm password"
            type="password"
            register={register("confirmPassword")}
            error={errors?.confirmPassword?.message}
          />

          <div className="w-full h-auto gap-4 flex flex-col justify-center mt-6">
            <AnimatedButton
              type="submit"
              className="w-full text-black-100 h-[55px] bg-white rounded-xl text-2xl cursor-pointer font-bold uppercase "
              hoverBackgroundColor="#E80352"
              hoverTextColor="#FFFFFF"
            >
              Continue
            </AnimatedButton>
            <p className="text-white text-center text-lg mt-2">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/sign-in")}
                className="underline font-bold text-pink-200 cursor-pointer hover:text-pink-300 transition-colors"
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
