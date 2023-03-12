import React from 'react';
import { FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <div className="footer-description">
        <p>This is a to-do list application created with React.</p>
        <p>Created by [Your Name]</p>
      </div>
      <div className="footer-search">
        <input type="text" placeholder="Search tasks" />
      </div>
      <div className="footer-links">
        <ul>
          <li><a href="#"><FaHome /> Home</a></li>
          <li><a href="#"><FaInfoCircle /> About</a></li>
          <li><a href="#"><FaEnvelope /> Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
