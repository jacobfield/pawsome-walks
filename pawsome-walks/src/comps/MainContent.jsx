import SignUp from "./SignUp.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import WalkDetail from "./WalkDetail.jsx";
import { useAuth } from "./AuthContext.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignIn from "./SignIn.jsx";

//
export default function MainContent({ allWalks, darkTheme, navBarProps }) {
  const location = useLocation();
  const isSignupPage = location.pathname.endsWith("SignUp");
  const isLoginPage = location.pathname.endsWith("SignIn");
  const { owner, isLoggedIn } = useAuth();

  // console.log("Maincontent Owner: ", owner);
  // console.log("Maincontent  IsLoggedIn: ", isLoggedIn);
  return (
    <div className="app">
      {!isSignupPage && !isLoginPage && <Header navBarProps={navBarProps} />}
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Main allWalks={allWalks} />} />
          <Route path="/walk/:walkid" element={<WalkDetail />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </div>
      {!isSignupPage && !isLoginPage && <Footer />}
    </div>
  );
}
