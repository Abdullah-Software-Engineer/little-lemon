import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import BookingPage from './pages/BookingPage'
import ConfirmedBooking from './pages/ConfirmedBooking'
import AboutPage from './pages/AboutPage'
import MenuPage from './pages/MenuPage'
import OrderPage from './pages/OrderPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="reservations" element={<BookingPage />} />
        <Route path="confirmed" element={<ConfirmedBooking />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}
