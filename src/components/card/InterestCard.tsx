import { motion } from "framer-motion";

type InterestCardProps = {
  interestName: string;
  isSelected: boolean;
  onClick?: (data: string) => void;
  backgroundColor?: string;
};

const InterestCard = ({
  interestName,
  isSelected = false,
  onClick,
  backgroundColor = "#0D0D0D",
}: InterestCardProps) => {
  return (
    <motion.div
      whileHover={{ borderColor: "#FFFFFF", backgroundColor: "#E80352" }}
      animate={
        isSelected
          ? { borderColor: "#FFFFFF", backgroundColor: "#E80352" }
          : { borderColor: "#565656", backgroundColor: backgroundColor }
      }
      onClick={() => onClick?.(interestName)}
      className={
        "w-auto h-[45px] cursor-pointer rounded-full text-white text-lg px-6 py-2 flex items-center justify-center border-2 border-gray-300"
      }
    >
      {interestName}
    </motion.div>
  );
};

export default InterestCard;
