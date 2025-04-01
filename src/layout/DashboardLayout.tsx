import DashboardSidebar from "../components/sidebar/DashboardSidebar.tsx";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className={"w-full h-[89.6vh] flex"}>
      <DashboardSidebar />
      <div className={"w-full px-6 py-4"}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
