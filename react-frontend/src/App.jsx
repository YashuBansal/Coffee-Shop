import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import UserRegister from "./components/UserRegister";
import UserLogin from "./components/UserLogin";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import OrderPage from "./components/OrderPage";

import Navbar from "./pages/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Testimonials from "./pages/Testimonials";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import "./index.css";

// Import ViewportFixer to set real viewport height
import Viewport from "./pages/ViewPort";

// Layout with Navbar/Footer for main pages
const MainLayout = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Menu />
    <Testimonials />
    <Gallery />
    <Contact />
    <Footer />
    <Viewport />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-page" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
