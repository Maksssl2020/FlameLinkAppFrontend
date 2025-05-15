import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import Layout from "./layout/Layout.tsx";
import SignUpFirstStep from "./pages/SignUpFirstStep.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUpSecondStep from "./pages/SignUpSecondStep.tsx";
import SignUpThirdStep from "./pages/SignUpThirdStep.tsx";
import AdminInterestsManagement from "./pages/admin/AdminInterestsManagement.tsx";
import ProtectedAdminRoute from "./router/ProtectedAdminRoute.tsx";
import AccountOverall from "./pages/account/AccountOverall.tsx";
import DashboardDiscoverPeople from "./pages/dashboard/DashboardDiscoverPeople.tsx";
import DashboardLayout from "./layout/DashboardLayout.tsx";
import DashboardMatches from "./pages/dashboard/DashboardMatches.tsx";
import DashboardNews from "./pages/dashboard/DashboardForum.tsx";
import DashboardUserLikes from "./pages/dashboard/DashboardUserLikes.tsx";
import AccountLayout from "./layout/AccountLayout.tsx";
import AccountProfile from "./pages/account/AccountProfile.tsx";
import AdminNewsForm from "./pages/admin/AdminNewsForm.tsx";
import DashboardUserDislikes from "./pages/dashboard/DashboardUserDislikes.tsx";
import About from "./pages/About.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import ForumTopic from "./pages/ForumTopic.tsx";
import DashboardMessages from "./pages/dashboard/DashboardMessages.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up/step/1" element={<SignUpFirstStep />} />
        <Route path="/sign-up/step/2" element={<SignUpSecondStep />} />
        <Route path="/sign-up/step/3" element={<SignUpThirdStep />} />
        <Route path="/sign-in" element={<SignIn />} />

        <Route element={<Layout />}>
          <Route element={<DashboardLayout />}>
            <Route
              path={"/dashboard/discover-people"}
              element={<DashboardDiscoverPeople />}
            />
            <Route path={"/dashboard/news"} element={<DashboardNews />} />
            <Route path={"/dashboard/matches"} element={<DashboardMatches />} />
            <Route
              path={"/dashboard/liked-people"}
              element={<DashboardUserLikes />}
            />
            <Route
              path={"/dashboard/disliked-people"}
              element={<DashboardUserDislikes />}
            />
            <Route
              path={"/dashboard/messages"}
              element={<DashboardMessages />}
            />
          </Route>

          <Route element={<UserProfile />} path={"/user/:userId"} />
          <Route element={<ForumTopic />} path={"/forum/topic/:topicId"} />

          <Route element={<AccountLayout />}>
            <Route path={"/account/overall"} element={<AccountOverall />} />
            <Route path={"/account/profile"} element={<AccountProfile />} />

            <Route element={<ProtectedAdminRoute />}>
              <Route
                path={"/account/admin/manage-interests"}
                element={<AdminInterestsManagement />}
              />
              <Route
                path={"/account/admin/news-form"}
                element={<AdminNewsForm />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
