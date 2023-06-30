import React from 'react';
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import './Footer.css';

const Footer = () => {
  return (

    <div><br />
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h2 className="footer-heading">Contact Us</h2>
            <p className="footer-info">123 Street, City</p>
            <p className="footer-info">Email: rupam@doomshell.com</p>
            <p className="footer-info">Phone: +91 8538945025</p>
          </div>
          <div className="footer-section">
            <h2 className="footer-heading">Explore</h2>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">
                  Products
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h2 className="footer-heading">Follow Us</h2>
            <div className="social-icons">
              <Link to="#" className="social-icon">
                <Facebook />
              </Link>
              <Link to="#" className="social-icon">
                <Twitter />
              </Link>
              <Link to="#" className="social-icon">
                <Instagram />
              </Link>
            </div>

          </div>
        </div>
        <p className="footer-info">&copy; 2023 Doomshell Software. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;
