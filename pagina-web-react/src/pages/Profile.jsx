import React, { useEffect } from 'react'
import LazyImage from '../components/LazyImage'

const Profile = () => {
  useEffect(() => {
    // Animaciones de entrada
    const elements = document.querySelectorAll('.profile-hero, .profile-header, .profile-name, .profile-title, .profile-location, .profile-social, .profile-content, .profile-description')
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`
    })
  }, [])

  return (
    <>
      {/* Profile Hero */}
      <section className="profile-hero" style={{ paddingTop: '6rem' }}>
        <div className="container">
          <div className="profile-header">
            <div className="profile-avatar">
              <LazyImage
                src="https://avatars.githubusercontent.com/u/148897864?s=400&u=a63e92839026f2db585d3fd2867f9acd95e2ada8&v=4"
                alt="Foto de Perfil"
                className="avatar-img"
              />
            </div>
            <div className="profile-info">
              <h1 className="profile-name">Lisandro Jose Herrera Guzman</h1>
              <h2 className="profile-title">Estudiante de Ingeniería de Software</h2>
              <p className="profile-location">
                <i className="fas fa-map-marker-alt"></i>{' '}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=San+Juan+Nepomuceno,+Colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  San Juan Nepomuceno, Colombia
                </a>
              </p>
              <div className="profile-social">
                <a
                  href="https://github.com/dashboard"
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i> GitHub
                </a>
                <a
                  href="https://www.instagram.com/lisandro.herrera.0?igsh=aXphZTJuMjN5amt4"
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="profile-content">
        <div className="container">
          <div className="profile-section">
            <h2 className="section-title">Sobre Mí</h2>
            <p className="profile-description">
              Soy un estudiante apasionado de Ingeniería de Software en la Universidad de Cartagena, con interés en el desarrollo de aplicaciones y soluciones tecnológicas. Me gusta aprender nuevas tecnologías y aplicar mis conocimientos en proyectos prácticos. Tengo conocimientos básicos en inglés y estoy comprometido con mi formación académica para convertirme en un profesional en el campo de la tecnología.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile
