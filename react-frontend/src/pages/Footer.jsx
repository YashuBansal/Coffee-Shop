import React from 'react';
import '../index.css'; // or include this in App.css

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="content-section">
        <p className="copyright-text">© 2023 Coffee. All rights reserved.</p>
        <div className="social-links">
          <a href="/" className="social-link"><i className="fab fa-facebook-f"></i></a>
          <a href="/" className="social-link"><i className="fab fa-instagram"></i></a>
          <a href="/" className="social-link"><i className="fab fa-twitter"></i></a>
          <a href="/" className="social-link"><i className="fab fa-youtube"></i></a>
        </div>
        <p className="policy-text">
          <a href="/" className="policy-link">Privacy Policy</a> |{' '}
          <a href="/" className="policy-link">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
