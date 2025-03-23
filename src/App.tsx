import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import Layout from "./layout/Layout.tsx";
import SignUpFirstStep from "./pages/SignUpFirstStep.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUpSecondStep from "./pages/SignUpSecondStep.tsx";
import SignUpThirdStep from "./pages/SignUpThirdStep.tsx";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
