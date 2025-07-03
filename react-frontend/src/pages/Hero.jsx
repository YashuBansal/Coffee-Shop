import React from 'react';
import heroImage from '../assets/images/coffee-hero-section.png';
import { HashLink as Link } from 'react-router-hash-link';

const Hero = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <section className="hero-section" id="home">
      <div className="content-section">
        <div className="hero-text">
          <h2 className="title">Best Coffee</h2>
          <h3 className="subtitle">Your daily dose of caffeine and comfort.</h3>
          <p className="description">
            Welcome to our coffee paradise, where every bean tells a story and every cup sparks joy.
          </p>

          <div className="hero-buttons">
            {user ? (
              <Link to="#" className="button login-now">Order Now</Link>
            ):(
              <Link to="/user-register" className="button register-now">Register Now</Link>
            )
            }
            <Link to="/#contact" className="button contact-us">Contact Us</Link>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img src={heroImage} alt="Coffee" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;