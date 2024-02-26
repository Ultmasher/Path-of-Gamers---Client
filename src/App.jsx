import RegisterPage from './components/RegisterPage';
import LandingPage from './components/LandingPage';
import { Route , Routes } from 'react-router';
import './styles/App.css';
import './styles/ColourPalette.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default App
