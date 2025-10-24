import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 Lisandro Jose Herrera Guzman. Todos los derechos reservados.</p>
        <div className="social-links">
          <a
            href="https://github.com/dashboard"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.instagram.com/lisandro.herrera.0?igsh=aXphZTJuMjN5amt4"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
