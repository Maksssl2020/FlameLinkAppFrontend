import { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionBannerProps = {
  title: string;
  children?: ReactNode;
};

const SectionBanner = ({ title, children }: SectionBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full min-h-[85px] flex items-end border-b-2 p-3 border-pink-100"
    >
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl uppercase font-bold text-gradient"
      >
        {title}
      </motion.h1>
      <div className="w-auto text-white h-auto flex ml-auto mt-auto">
        {children}
      </div>
    </motion.div>
  );
};

export default SectionBanner;
