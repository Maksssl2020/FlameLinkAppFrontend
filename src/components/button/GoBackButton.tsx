import AnimatedButton from "./AnimatedButton.tsx";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

type GoBackButtonProps = {
  position?: string;
};

const GoBackButton = ({ position = "top-2 left-2" }: GoBackButtonProps) => {
  const navigate = useNavigate();

  return (
    <AnimatedButton
      type={"button"}
      className={`size-12 rounded-full cursor-pointer border-2 border-white text-white absolute ${position}`}
      onClick={() => navigate(-1)}
    >
      <GoArrowLeft className={"size-7"} />
    </AnimatedButton>
  );
};

export default GoBackButton;
