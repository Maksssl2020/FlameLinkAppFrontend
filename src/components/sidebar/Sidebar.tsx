import SidebarContainer from "./SidebarContainer.tsx";
import { SectionType } from "../../types/types.ts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

type SidebarProps = {
  sections: SectionType[];
  linkPrefix: string;
  children?: ReactNode;
};

const Sidebar = ({ sections, linkPrefix, children }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <SidebarContainer>
      <ul className={"flex flex-col gap-4"}>
        {sections.map((section, index) => (
          <motion.li
            onClick={() => navigate(`/${linkPrefix}/${section.url}`)}
            animate={
              location.pathname.includes(section.url)
                ? { borderColor: "#E80352" }
                : { borderColor: "#292929" }
            }
            key={index}
            className={
              "w-full pb-2 cursor-pointer px-1 h-[50px] text-white border-b-2 uppercase flex items-end"
            }
          >
            {section.name}
          </motion.li>
        ))}
      </ul>
      <div className={"w-full h-auto mt-auto"}>{children}</div>
    </SidebarContainer>
  );
};

export default Sidebar;
