import React, { useState, useEffect } from 'react'
import Notification from '../components/Notification'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'baja',
    newsletter: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    // Animaciones de entrada
    const elements = document.querySelectorAll('.page-header, .page-title, .page-subtitle, .contact-item, .social-card, .form-card')
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`
    })
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio.'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Por favor, ingresa un email válido.'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es obligatorio.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.has-error')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsSubmitting(true)
    showNotification('Enviando mensaje...', 'info')

    // Simulate form submission
    setTimeout(() => {
      showNotification('¡Mensaje enviado exitosamente! Te responderé pronto.', 'success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: 'baja',
        newsletter: false
      })
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <>
      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Contacto</h1>
          <p className="page-subtitle">¡Ponte en contacto conmigo!</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-section">
                <h2 className="section-title">Información de Contacto</h2>
                <div className="contact-items">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-details">
                      <h3>Email</h3>
                      <p>
                        <a href="mailto:herraralisandro422@gmail.com">Herraralisandro422@gmail.com</a>
                      </p>
                      <a href="mailto:herraralisandro422@gmail.com" className="contact-link">
                        Enviar Email
                      </a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="contact-details">
                      <h3>Teléfono</h3>
                      <p>310 706 6412</p>
                      <a href="tel:3107066412" className="contact-link">Llamar</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-details">
                      <h3>Ubicación</h3>
                      <p>San Juan Nepomuceno, Colombia</p>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=San+Juan+Nepomuceno,+Colombia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                      >
                        Ver en Mapa
                      </a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="contact-details">
                      <h3>Horario Disponible</h3>
                      <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                      <p>Sábados: 10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-section">
                <h2 className="section-title">Redes Sociales</h2>
                <div className="social-grid">
                  <a
                    href="https://github.com/dashboard"
                    className="social-card github"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github"></i>
                    <div>
                      <h3>GitHub</h3>
                      <p>Revisa mis proyectos</p>
                    </div>
                  </a>
                  <a
                    href="https://www.instagram.com/lisandro.herrera.0?igsh=aXphZTJuMjN5amt4"
                    className="social-card instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                    <div>
                      <h3>Instagram</h3>
                      <p>Conoce mi lado personal</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <div className="form-card">
                <h2 className="section-title">Envíame un Mensaje</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="subject" className="form-label">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="message" className="form-label">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="priority" className="form-label">
                      Prioridad
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      className="form-select"
                      value={formData.priority}
                      onChange={handleInputChange}
                    >
                      <option value="baja">Baja</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                      <option value="urgente">Urgente</option>
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="newsletter"
                        id="newsletter"
                        className="form-check-input"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="newsletter">
                        Suscribirse al boletín de noticias
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                  >
                    <i className="fas fa-paper-plane"></i>
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="contact-extra">
            <div className="extra-section">
              <h2 className="section-title">¿Por qué contactarme?</h2>
              <div className="reasons-grid">
                <div className="reason-card">
                  <i className="fas fa-rocket"></i>
                  <h3>Respuesta Rápida</h3>
                  <p>Respondo todos los mensajes en menos de 24 horas</p>
                </div>
                <div className="reason-card">
                  <i className="fas fa-handshake"></i>
                  <h3>Consulta Gratuita</h3>
                  <p>Primera consulta sin costo para evaluar tu proyecto</p>
                </div>
                <div className="reason-card">
                  <i className="fas fa-users"></i>
                  <h3>Colaboración</h3>
                  <p>Abierto a nuevas oportunidades y proyectos interesantes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
