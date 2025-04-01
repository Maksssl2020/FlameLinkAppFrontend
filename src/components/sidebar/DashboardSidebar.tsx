import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type SectionType = {
  name: string;
  url: string;
};

const sections: SectionType[] = [
  { name: "Discover People", url: "discover-people" },
  { name: "Forum", url: "forum" },
  { name: "Your Matches", url: "matches" },
  { name: "Liked People", url: "liked-people" },
];

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={"min-w-[300px] h-full border-r-2 border-gray-200 p-4"}>
      <ul className={"flex flex-col gap-4"}>
        {sections.map((section, index) => (
          <motion.li
            onClick={() => navigate(`/dashboard/${section.url}`)}
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
    </div>
  );
};

export default DashboardSidebar;
