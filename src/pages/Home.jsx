import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LazyImage from '../components/LazyImage'

const Home = () => {
  useEffect(() => {
    // Animaciones de entrada
    const elements = document.querySelectorAll('.hero-section, .hero-content, .hero-title, .hero-subtitle, .hero-description, .hero-buttons, .highlights-grid, .quick-info-grid')
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`
    })
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="profile-image">
            <LazyImage
              src="https://avatars.githubusercontent.com/u/148897864?s=400&u=a63e92839026f2db585d3fd2867f9acd95e2ada8&v=4"
              alt="Foto de Perfil"
              className="profile-img"
            />
          </div>
          <div className="hero-text">
            <h1 className="hero-title">Lisandro Jose Herrera Guzman</h1>
            <h2 className="hero-subtitle">Estudiante de Ingeniería de Software</h2>
            <p className="hero-description">
              Soy un estudiante de 23 años nacido el 27 de mayo, originario de San Juan Nepomuceno, Bolívar. Actualmente curso el 5to semestre de Ingeniería de Software en la Universidad de Cartagena. Domino el español como lengua nativa y tengo conocimientos básicos de inglés.
            </p>
            <div className="hero-buttons">
              <Link to="/perfil" className="btn btn-primary">Ver Perfil Completo</Link>
              <Link to="/contacto" className="btn btn-secondary">Contactar</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="highlights-section">
        <div className="container">
          <h2 className="section-title">Destacados</h2>
          <div className="highlights-grid">
            <div className="highlight-card">
              <i className="fas fa-code highlight-icon"></i>
              <h3>Desarrollo Web</h3>
              <p>Especialista en crear aplicaciones web modernas y responsivas</p>
            </div>
            <div className="highlight-card">
              <i className="fas fa-mobile-alt highlight-icon"></i>
              <h3>Diseño Responsivo</h3>
              <p>Especialista en crear experiencias web adaptables</p>
            </div>
            <div className="highlight-card">
              <i className="fas fa-users highlight-icon"></i>
              <h3>Trabajo en Equipo</h3>
              <p>Excelente capacidad de colaboración y liderazgo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="quick-info-section">
        <div className="container">
          <div className="quick-info-grid">
            <div className="info-item">
              <h3>Ubicación</h3>
              <p>
                <i className="fas fa-map-marker-alt"></i>{' '}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=San+Juan+Nepomuceno,+Bolívar,+Colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  San Juan Nepomuceno, Bolívar
                </a>
              </p>
            </div>
            <div className="info-item">
              <h3>Email</h3>
              <p>
                <i className="fas fa-envelope"></i>{' '}
                <a href="mailto:herraralisandro422@gmail.com">herraralisandro422@gmail.com</a>
              </p>
            </div>
            <div className="info-item">
              <h3>Teléfono</h3>
              <p><i className="fas fa-phone"></i> 310 706 6412</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
