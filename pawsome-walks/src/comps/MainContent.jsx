import SignUp from "./SignUp.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import WalkDetail from "./WalkDetail.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
export default function MainContent({ allWalks, darkTheme }) {
  const location = useLocation();
  const isSignupPage = location.pathname.endsWith("signUp");
  const isLoginPage = location.pathname.endsWith("logIn");

  return (
    <div className="app">
      {!isSignupPage && !isLoginPage && <Header />}
      <div className={`mainContent ${!darkTheme ? "icon-right" : ""}`}>
        <Routes>
          <Route path="/" element={<Main allWalks={allWalks} />} />
          <Route path="/walk/:walkid" element={<WalkDetail />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
