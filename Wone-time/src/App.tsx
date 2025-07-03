import UserAccount from "./pages/LoginSignup";
import Home from "./pages/Home";
import Report from "./pages/Report";
import ForgotPassword from "./pages/ForgotPassword";
import AuthProvider from "./AuthLoader";
import TimeEntries from "./pages/TimeEntries";

import { useLoginInfo } from "./stores/loginState";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout1 from "./Layout1";
import Layout2 from "./Layout2";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";

const queryClient = new QueryClient();

function App() {
  // const loginStatus = useLoginInfo((state) => state.loginStatus);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (!loginStatus && location.pathname !== "/Login_Signup")
  //     navigate("/Login_Signup");
  // });

  onAuthStateChanged(auth, () => {
    if (!auth.currentUser && location.pathname !== "/forgotpassword") {
      useLoginInfo.getState().resetStore();
      navigate("/Login_Signup");
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route element={<Layout1 />}>
            <Route path="/Login_Signup" element={<UserAccount />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Route>
          <Route element={<Layout2 />}>
            <Route path="/" element={<Home />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/timeEntries" element={<TimeEntries />} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
