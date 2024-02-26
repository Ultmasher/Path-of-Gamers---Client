import RegisterForm from '../components/RegisterForm'
import { Routes, Route } from 'react-router-dom'
import "./styles/App.css";


function App() {

  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  )
}

export default App
