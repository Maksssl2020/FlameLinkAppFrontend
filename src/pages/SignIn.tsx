import Page from "../animations/Page.tsx";
import FormInput from "../components/input/FormInput.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInValidator } from "../validators/signInValidator.ts";
import { LoginRequest } from "../types/authenticationTypes.ts";
import useLoginMutation from "../hooks/muatations/useLoginMutation.ts";
import Spinner from "../components/spinner/Spinner.tsx";

const SignIn = () => {
  const navigate = useNavigate();
  const { login, logging } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInValidator),
  });

  const onSubmit = (data: LoginRequest) => {
    login(data);
  };

  if (logging) {
    return <Spinner />;
  }

  return (
    <Page>
      <div
        className={
          "w-[700px] gap-12 px-4 py-8 flex items-center flex-col h-auto border-2 border-pink-100 rounded-xl"
        }
      >
        <h1 className={"text-4xl text-white"}>
          Sign In on{" "}
          <span className={"text-gradient font-bold"}>FlameLink</span>
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={"flex flex-col w-full h-auto gap-4"}
        >
          <FormInput
            title={"Username"}
            type={"text"}
            register={register("username")}
            error={errors?.username?.message}
          />
          <FormInput
            title={"Password"}
            type={"password"}
            register={register("password")}
            error={errors?.password?.message}
          />

          <div
            className={"w-full h-auto gap-3 mt-8 flex flex-col justify-center"}
          >
            <AnimatedButton
              type={"submit"}
              className={
                "w-full h-[50px] bg-white rounded-xl text-2xl cursor-pointer font-bold uppercase"
              }
            >
              Sign In
            </AnimatedButton>
            <p className={"text-white text-center text-lg"}>
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/sign-up/step/1")}
                className={"underline font-bold text-pink-200 cursor-pointer"}
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </Page>
  );
};

export default SignIn;
