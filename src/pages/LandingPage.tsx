import Page from "../animations/Page.tsx";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "../components/button/AnimatedButton.tsx";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <div className={"w-full h-full flex justify-center items-center"}>
        <AnimatedButton
          onClick={() => navigate("/sign-up/step/1")}
          className={
            "bg-white cursor-pointer font-bold w-[250px] h-[50px] rounded-xl"
          }
        >
          Get Started
        </AnimatedButton>
      </div>
    </Page>
  );
};

export default LandingPage;
