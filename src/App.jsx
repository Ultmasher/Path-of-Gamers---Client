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
import DiscordCallback from './components/DiscordCallback';
import { useAuth } from "./context/AuthContext";


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
            <Route path="/" element={<HomeFeed />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/account/game-settings" element={<GameSettings />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/addgame" element={<AddGameInformation />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
