import RegisterPage from './components/RegisterPage';
import LandingPage from './components/LandingPage';
import LoginForm from './components/loginPage';
import { Route , Routes } from 'react-router';
import './styles/App.css';
import './styles/ColourPalette.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  )
}

export default App
