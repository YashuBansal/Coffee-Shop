import React, { useState } from 'react';
import '../index.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle('nav-open');
    document.body.classList.toggle('icon-hidden');
  };

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
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#menu" className="nav-link">Menu</a></li>
          <li><a href="#testimonials" className="nav-link">Testimonials</a></li>
          <li><a href="#gallery" className="nav-link">Gallery</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>

        <button id="nav-toggle-open" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
