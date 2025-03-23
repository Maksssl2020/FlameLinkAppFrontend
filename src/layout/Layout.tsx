import { Outlet } from "react-router-dom";
import Header from "../components/header/Header.tsx";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className={"px-16 py-24"}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
