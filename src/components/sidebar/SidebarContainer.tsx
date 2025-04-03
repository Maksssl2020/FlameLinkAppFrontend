import { ReactNode } from "react";

type SidebarContainerProps = {
  children: ReactNode;
};

const SidebarContainer = ({ children }: SidebarContainerProps) => {
  return (
    <div
      className={
        "min-w-[300px] h-full flex flex-col border-r-2 border-gray-200 p-4"
      }
    >
      {children}
    </div>
  );
};

export default SidebarContainer;
