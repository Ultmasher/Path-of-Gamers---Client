import RegisterPage from './components/RegisterPage';
import LandingPage from './components/LandingPage';
import LoginForm from './components/loginPage';
import HomePage from './components/HomePage';
import NewEvent from './components/NewEvent';
import LoLView from './components/LoLView';
import { Route, Routes } from 'react-router';
import './styles/App.css';
import './styles/ColourPalette.css';
import { Cloudinary } from "@cloudinary/url-gen";



function App() {
  const cld = new Cloudinary({ cloud: { cloudName: 'doheyrauw' } });

  return (
    <>
      <Routes>
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/newevent" element={<NewEvent />} />
        <Route path="/lol" element={<LoLView />} />
      </Routes>
    </>
  )
}

export default App
