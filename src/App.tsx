import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import Layout from "./layout/Layout.tsx";
import SignUpFirstStep from "./pages/SignUpFirstStep.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUpSecondStep from "./pages/SignUpSecondStep.tsx";
import SignUpThirdStep from "./pages/SignUpThirdStep.tsx";
import AdminInterestsManagement from "./pages/AdminInterestsManagement.tsx";
import ProtectedAdminRoute from "./router/ProtectedAdminRoute.tsx";
import Account from "./pages/Account.tsx";
import DiscoverPeople from "./pages/DiscoverPeople.tsx";
import DashboardLayout from "./layout/DashboardLayout.tsx";
import Matches from "./pages/Matches.tsx";
import Forum from "./pages/Forum.tsx";
import UserLikes from "./pages/UserLikes.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-up/step/1" element={<SignUpFirstStep />} />
          <Route path="/sign-up/step/2" element={<SignUpSecondStep />} />
          <Route path="/sign-up/step/3" element={<SignUpThirdStep />} />
          <Route path="/sign-in" element={<SignIn />} />

          <Route element={<DashboardLayout />}>
            <Route
              path={"/dashboard/discover-people"}
              element={<DiscoverPeople />}
            />
            <Route path={"/dashboard/forum"} element={<Forum />} />
            <Route path={"/dashboard/matches"} element={<Matches />} />
            <Route path={"/dashboard/liked-people"} element={<UserLikes />} />
          </Route>

          <Route path={"/account"} element={<Account />} />

          <Route element={<ProtectedAdminRoute />}>
            <Route
              path={"/admin/interest-form"}
              element={<AdminInterestsManagement />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
