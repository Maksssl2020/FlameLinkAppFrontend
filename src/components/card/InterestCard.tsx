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
      whileHover={{ scale: 1.05, borderColor: "#FE5487" }}
      whileTap={{ scale: 0.95 }}
      animate={
        isSelected
          ? {
              borderColor: "#FE5487",
              backgroundColor: "#FE5487",
              color: "#141414",
            }
          : { borderColor: "#292929", backgroundColor, color: "#FFFFFF" }
      }
      onClick={() => onClick?.(interestName)}
      className="px-4 py-2 rounded-full border-2 text-white font-medium cursor-pointer transition-all"
    >
      {interestName}
    </motion.div>
  );
};

export default InterestCard;
