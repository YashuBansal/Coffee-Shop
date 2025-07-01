import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import UserRegister from "./components/UserRegister";
import UserLogin from "./components/UserLogin";
import Profile from "./components/Profile";

import Navbar from "./pages/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Testimonials from "./pages/Testimonials";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import "./index.css";

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
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
