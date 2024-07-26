import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faGithub, faLinkedin, faXTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica para suscripción
    console.log(`Email enviado: ${email}`);
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <p>Información de contacto: +573003019962 <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" /></p>
        <p>Producto desarrollado por Andres Mena</p>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-right">
        <p>Suscríbete:</p>
        <form onSubmit={handleSubscribe} className="subscription-form">
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </form>
        <div className="social-icons">
          <a href="https://github.com/valeriomena" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="http://www.linkedin.com/in/andres-mena" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
