import React, { useEffect } from 'react'

const Education = () => {
  useEffect(() => {
    // Animaciones de entrada
    const elements = document.querySelectorAll('.page-header, .page-title, .page-subtitle, .education-item, .education-sidebar')
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`
    })
  }, [])

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Educación</h1>
          <p className="page-subtitle">Mi formación académica y desarrollo profesional</p>
        </div>
      </section>

      {/* Education Content */}
      <section className="education-content">
        <div className="container">
          <div className="education-grid">
            <div className="education-main">
              <div className="education-section">
                <h2 className="section-title">Formación Académica</h2>
                <div className="education-timeline">
                  <div className="education-item">
                    <div className="education-icon">
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div className="education-content">
                      <div className="education-header">
                        <h3 className="degree-title">Ingeniería de Software</h3>
                        <h4 className="institution-name">Universidad de Cartagena</h4>
                        <div className="education-period">
                          <span className="period-date">2023 - Presente</span>
                          <span className="education-location">
                            <i className="fas fa-map-marker-alt"></i> Cartagena, Colombia
                          </span>
                        </div>
                      </div>
                      <div className="education-details">
                        <p>
                          Programa de Ingeniería de Software enfocado en el desarrollo de aplicaciones, algoritmos, bases de datos y metodologías de desarrollo de software. Actualmente cursando el 5to semestre.
                        </p>
                        <div className="education-highlights">
                          <h5>Puntos Destacados:</h5>
                          <ul>
                            <li>Desarrollo de proyectos prácticos en lenguajes de programación</li>
                            <li>Aprendizaje de metodologías ágiles y gestión de proyectos</li>
                            <li>Conocimientos en bases de datos y sistemas de información</li>
                            <li>Fundamentos de algoritmos y estructuras de datos</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="education-sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-title">Idiomas</h3>
                <div className="language-list">
                  <div className="language-item">
                    <span className="language-name">Español</span>
                    <span className="language-level">Nativo</span>
                    <div className="language-bar">
                      <div className="language-progress" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div className="language-item">
                    <span className="language-name">Inglés</span>
                    <span className="language-level">Básico</span>
                    <div className="language-bar">
                      <div className="language-progress" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Education
