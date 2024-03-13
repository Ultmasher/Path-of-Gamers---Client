import RegisterPage from "../src/components/RegisterPage";
import LandingPage from "../src/components/LandingPage";
import LoginForm from "../src/components/loginPage";
import HomeFeed from "../src/components/HomeFeed";
import AccountSettings from "../src/components/AccountSettings";
import GameSettings from "../src/components/GameSettings";
import ProfilePage from "../src/components/ProfilePage";
import AddGameInformation from "../src/components/AddGameInformation";
import "../src/styles/App.css";
import "../src/styles/ColourPalette.css";
import DiscordCallback from '../src/components/DiscordCallback'


export const publicRoutes = [
    {path :'/welcome', element :<LandingPage />},
    {path :'/register', element :<RegisterPage />},
    {path :'/login', element :<LoginForm />}
]

export const privateRoutes = [
    {path :'/', element :<HomeFeed />},
    {path :'/account', element :<AccountSettings />},
    {path :'/account/game-settings', element :<GameSettings />},
    {path :'/profile', element :<ProfilePage />},
    {path :'/addgame', element :<AddGameInformation />},
    {path :'/user/auth/discord/callback', element :<DiscordCallback  />},


]