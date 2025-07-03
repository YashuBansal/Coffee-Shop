import React, { useState } from 'react';
import '../index.css';
import { HashLink as Link } from 'react-router-hash-link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle('nav-open');
    document.body.classList.toggle('icon-hidden');
  };
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header>
      <nav className="navbar content-section">
        <a href="/" className="nav-logo">
          <h2 className="logo-text">☕Coffee</h2>
        </a>

        <ul className={`nav-menu nav-item ${menuOpen ? 'open' : ''}`}>
          <button id="nav-toggle-close" onClick={toggleMenu}>
            <i className="fas fa-times"></i>
          </button>
          <li><Link to="/#home" smooth className="nav-link">Home</Link></li>
          <li><Link to="/#about" smooth className="nav-link">About</Link></li>
          <li><Link to="/#menu" smooth className="nav-link">Menu</Link></li>
          <li><Link to="/#testimonials" smooth className="nav-link">Testimonials</Link></li>
          <li><Link to="/#gallery" smooth className="nav-link">Gallery</Link></li>
          <li><Link to="/#contact" smooth className="nav-link">Contact</Link></li>
          <li>
            {user ? (
                <Link to="/profile" className="nav-link"><i class="fa-regular fa-circle-user"></i> {user.name}</Link>
              ) : (
                <Link to="/user-login" className="nav-link">Login <i className="fa fa-sign-in"></i></Link>
              )}
          </li>
        </ul>

        <button id="nav-toggle-open" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
