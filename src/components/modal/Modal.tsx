import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

type modalProps = {
  children: ReactNode;
};

const Modal = ({ children }: modalProps) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 backdrop-blur-sm z-10`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={"fixed inset-0 z-10 flex items-center justify-center"}
      >
        <div
          className={
            "z-10 flex h-auto w-auto items-center justify-center bg-transparent"
          }
        >
          {children}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
};

export default Modal;
