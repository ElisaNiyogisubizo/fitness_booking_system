import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Fitness from './components/Fitness'
import Login from './components/Login'
import Signup from './components/Signup'
import Booking from './components/Booking'
import AllBookings from './components/AllBookings'
import CreateFitness from './components/CreateFitness'

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/create-fitness" element={<CreateFitness />} />
        <Route path="/booking/:classId" element={<Booking />} />
        <Route path="/bookings" element={<AllBookings />} />
      </Routes>
    </Router>
  )
}

export default App