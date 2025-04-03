import { ReactNode } from "react";

type SectionBannerProps = {
  title: string;
  children?: ReactNode;
};

const SectionBanner = ({ title, children }: SectionBannerProps) => {
  return (
    <div
      className={
        "w-full min-h-[75px] flex items-end border-b-2 p-2 border-gray-200"
      }
    >
      <h1 className={"text-4xl uppercase text-gradient "}>{title}</h1>
      <div className={"w-auto text-white h-auto flex ml-auto mt-auto"}>
        {children}
      </div>
    </div>
  );
};

export default SectionBanner;
