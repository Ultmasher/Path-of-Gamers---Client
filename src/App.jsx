import RegisterForm from './components/RegisterForm'
import { Route , Routes } from 'react-router'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
      </Routes>
    </>
  )
}

export default App
