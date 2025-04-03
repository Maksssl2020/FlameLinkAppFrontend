import { ReactNode } from "react";

type SectionContainerProps = {
  children: ReactNode;
};

const SectionContainer = ({ children }: SectionContainerProps) => {
  return (
    <div className={"w-full flex flex-col items-center h-auto gap-8"}>
      {children}
    </div>
  );
};

export default SectionContainer;
