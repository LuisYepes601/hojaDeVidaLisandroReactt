import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollAnimation from '../hooks/useScrollAnimation'
import useAnimatedCounter from '../hooks/useAnimatedCounter'

const Experience = () => {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useScrollAnimation('.timeline-item, .experience-summary')

  useEffect(() => {
    const elements = document.querySelectorAll('.page-header, .page-title, .page-subtitle')
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`
    })

    fetchExperiences()
  }, [])

  // ✅ Cargar experiencias desde la API real
  const fetchExperiences = async () => {
    try {
      const API_BASE_URL = 'https://hojadevidaapi.onrender.com/api/experiencias'
      const USER_ID = '68f69164c434421622bbbafc'

      const response = await fetch(`${API_BASE_URL}/usuario/${USER_ID}`)
      if (!response.ok) throw new Error('Error al obtener experiencias desde la API')

      const data = await response.json()

      // Mapear los campos para el frontend
      const mappedData = data.map(exp => ({
        id: exp._id,
        title: exp.titulo,
        company: exp.empresa,
        period: exp.periodo,
        location: exp.ubicacion,
        description: exp.descripcion,
        achievements: exp.logros ? exp.logros.split(',').map(item => item.trim()) : [],
        technologies: exp.tecnologias ? exp.tecnologias.split(',').map(item => item.trim()) : []
      }))

      setExperiences(mappedData)
    } catch (error) {
      console.error('❌ Error al cargar experiencias:', error)

      // Fallback local
      setExperiences([
        {
          id: 1,
          title: 'Proyecto de Desarrollo Web',
          company: 'Proyecto Académico - Universidad de Cartagena',
          period: '2024 - Presente',
          location: 'Cartagena, Colombia',
          description: 'Desarrollo de una página web personal utilizando HTML, CSS y JavaScript para mostrar mi portafolio académico y profesional.',
          achievements: [
            'Implementación de diseño responsivo',
            'Integración de funcionalidades interactivas',
            'Optimización del rendimiento web'
          ],
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub']
        },
        {
          id: 2,
          title: 'Aprendizaje Autodidacta',
          company: 'Desarrollo Personal',
          period: '2023 - Presente',
          location: 'San Juan Nepomuceno, Colombia',
          description: 'Aprendizaje continuo de nuevas tecnologías y frameworks para el desarrollo web y móvil.',
          achievements: [
            'Dominio de React y Node.js',
            'Implementación de bases de datos NoSQL',
            'Desarrollo de aplicaciones full-stack'
          ],
          technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Git']
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const AnimatedStatItem = ({ target, suffix = '', label }) => {
    const count = useAnimatedCounter(target)
    return (
      <div className="stat-item">
        <span className="stat-number">{count}{suffix}</span>
        <span className="stat-label">{label}</span>
      </div>
    )
  }

  return (
    <>
      {/* Encabezado de página */}
      <section className="page-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="page-title">Experiencia Académica y Proyectos</h1>
              <p className="page-subtitle">Mis proyectos estudiantiles y actividades académicas</p>
            </div>
            <Link to="/admin-experiences" className="btn btn-primary">
              <i className="fas fa-cog"></i> Administrar
            </Link>
          </div>
        </div>
      </section>

      {/* Contenido de experiencias */}
      <section className="experience-content">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            <div className="experience-timeline">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="timeline-item">
                  <div className="timeline-marker">
                    <i className={
                      index === 0
                        ? 'fas fa-graduation-cap'
                        : index === 1
                        ? 'fas fa-book'
                        : 'fas fa-code'
                    }></i>
                  </div>
                  <div className="timeline-content">
                    <div className="job-header">
                      <h2 className="job-title">{exp.title}</h2>
                      <h3 className="company-name">{exp.company}</h3>
                      <div className="job-period">
                        <span className="period-date">{exp.period}</span>
                        <span className="job-location">
                          <i className="fas fa-map-marker-alt"></i> {exp.location}
                        </span>
                      </div>
                    </div>
                    <div className="job-description">
                      <p>{exp.description}</p>
                      <div className="job-achievements">
                        <h4>Logros Principales:</h4>
                        <ul>
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="job-technologies">
                        <h4>Tecnologías Utilizadas:</h4>
                        <div className="tech-tags">
                          {exp.technologies.map((tech, i) => (
                            <span key={i} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Resumen inferior */}
          <div className="experience-summary">
            <div className="summary-card">
              <h3>Resumen Académico</h3>
              <div className="summary-stats">
                <div className="stat-item">
                  <span className="stat-number">5to</span>
                  <span className="stat-label">Semestre Actual</span>
                </div>
                <AnimatedStatItem target={3} suffix="+" label="Proyectos Desarrollados" />
                <AnimatedStatItem target={10} suffix="+" label="Tecnologías Aprendidas" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Experience
