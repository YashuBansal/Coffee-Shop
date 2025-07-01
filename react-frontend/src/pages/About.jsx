import React from 'react';
import aboutImage from '../assets/images/about-image.jpg';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="content-section">
        <div className="about-image-wrapper">
          <img src={aboutImage} alt="About Coffee" className="about-image" />
        </div>
        <div className="about-details">
          <h2 className="section-title">About Us</h2>
          <p className="text">
            At Coffee, we believe in the magic of coffee. Our journey began with a simple
            passion for brewing the perfect cup, and today, we are proud to share our love for coffee with you.
          </p>
          <div className="social-links">
            <a href="/" className="social-link"><i className="fab fa-facebook-f"></i></a>
            <a href="/" className="social-link"><i className="fab fa-instagram"></i></a>
            <a href="/" className="social-link"><i className="fab fa-twitter"></i></a>
            <a href="/" className="social-link"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
