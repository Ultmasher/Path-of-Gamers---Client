import RegisterPage from "./components/RegisterPage";
import LandingPage from "./components/LandingPage";
import LoginForm from "./components/loginPage";
import NewEvent from "./components/NewEvent";
import LoLView from "./components/LoLView";
import MainHeader from "./components/MainHeader";
import HomeFeed from "./components/HomeFeed";
import AccountSettings from "./components/AccountSettings";
import GameSettings from "./components/GameSettings";
import ProfilePage from "./components/ProfilePage";
import AddGameInformation from "./components/AddGameInformation";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router";
import "./styles/App.css";
import "./styles/ColourPalette.css";
import { useAuth } from "./context/AuthContext";
import DiscordCallback from "./components/DiscordCallback";
import AuthProvider from "../src/context/AuthoriseProvider"




function App() {

  const {token} = useAuth();

  console.log(token)
  return (
    <>
      <div className="homepageWrapper">
        
        <MainHeader token={token} />

        <div className="homepageContent">
          <Routes>
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<AuthProvider><HomeFeed /></AuthProvider>} />
            <Route path="/account" element={<AuthProvider><AccountSettings /></AuthProvider>} />
            <Route path="/account/game-settings" element={<AuthProvider><GameSettings /></AuthProvider>} />
            <Route path="/profile" element={<AuthProvider><ProfilePage /></AuthProvider>} />
            <Route path="/profile/:id" element={<AuthProvider><ProfilePage /></AuthProvider>} />
            <Route path="/addgame" element={<AuthProvider><AddGameInformation /></AuthProvider>} />
            <Route path="/user/auth/discord/callback" element={<AuthProvider><DiscordCallback /></AuthProvider>} />

          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;