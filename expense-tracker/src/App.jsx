import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from './pages/MainLayout'
import UserDashboard from './pages/UserDashboard'


function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/dashboard" element={<UserDashboard />} />
    </Routes>
  </Router>
  )
}

export default App
