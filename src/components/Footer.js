import React from 'react';

const Footer = () => {
  const handleQuickLink = (link) => {
    console.log(`Quick link clicked: ${link}`);
    // Add your navigation logic here
  };

  const handleSocialLink = (platform) => {
    console.log(`Social link clicked: ${platform}`);
    // Add your social media navigation logic here
  };

  const quickLinks = ['About', 'Programs', 'Partners'];
  const socialLinks = [
    { platform: 'linkedin', icon: 'fa-linkedin' },
    { platform: 'twitter', icon: 'fa-twitter' },
    { platform: 'instagram', icon: 'fa-instagram' }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: internships@scad.edu</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <button 
                  className="footer-link"
                  onClick={() => handleQuickLink(link)}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <button 
                key={index}
                className="social-link"
                onClick={() => handleSocialLink(social.platform)}
              >
                <i className={`fab ${social.icon}`}></i>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SCAD Internship Program. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 