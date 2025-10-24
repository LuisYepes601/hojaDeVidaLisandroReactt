import React, { useEffect, useState } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const Skills = () => {
  const [filter, setFilter] = useState('all')

  useScrollAnimation('.skill-item, .experience-levels')

  useEffect(() => {
    // Animaciones de entrada
    const elements = document.querySelectorAll('.page-header, .page-title, .page-subtitle')
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`
    })
  }, [])

  const filterSkills = (skills) => {
    if (filter === 'all') return skills
    return skills.filter(skill => skill.category === filter)
  }

  const programmingSkills = [
    { name: 'HTML5', level: 'Junior', progress: '95%', category: 'frontend' },
    { name: 'CSS3', level: 'Junior', progress: '90%', category: 'frontend' },
    { name: 'JavaScript', level: 'Junior', progress: '85%', category: 'frontend' }
  ]

  const frameworkSkills = [
    { name: 'Bootstrap', level: 'Junior', progress: '95%', category: 'frontend' },
    { name: 'CSS3', level: 'Junior', progress: '90%', category: 'frontend' },
    { name: 'JavaScript', level: 'Junior', progress: '85%', category: 'frontend' },
    { name: 'Font Awesome', level: 'Junior', progress: '80%', category: 'frontend' }
  ]

  const backendSkills = [
    // Skills will be added here when available
  ]

  const databaseSkills = [
    { name: 'SQL', level: 'Junior', progress: '90%', category: 'backend' }
  ]

  const toolsSkills = [
    { name: 'Git', level: 'Junior', progress: '95%', category: 'tools' },
    { name: 'VSCode', level: 'Junior', progress: '90%', category: 'tools' },
    { name: 'Browser', level: 'Junior', progress: '85%', category: 'tools' }
  ]

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Habilidades</h1>
          <p className="page-subtitle">Mis competencias técnicas y profesionales</p>
        </div>
      </section>

      {/* Skills Content */}
      <section className="skills-content">
        <div className="container">
          {/* Filter Buttons */}
          <div className="skills-filter">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todas
            </button>
            <button
              className={`filter-btn ${filter === 'frontend' ? 'active' : ''}`}
              onClick={() => setFilter('frontend')}
            >
              Frontend
            </button>
            <button
              className={`filter-btn ${filter === 'backend' ? 'active' : ''}`}
              onClick={() => setFilter('backend')}
            >
              Backend
            </button>
            <button
              className={`filter-btn ${filter === 'tools' ? 'active' : ''}`}
              onClick={() => setFilter('tools')}
            >
              Herramientas
            </button>
          </div>

          <div className="skills-grid">
            <div className="skills-main">
              <div className="skills-section">
                <h2 className="section-title">Lenguajes de Programación</h2>
                <div className="skills-category">
                  {filterSkills(programmingSkills).map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: skill.progress }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="skills-section">
                <h2 className="section-title">Frameworks y Librerías Frontend</h2>
                <div className="skills-category">
                  {filterSkills(frameworkSkills).map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: skill.progress }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="skills-section">
                <h2 className="section-title">Frameworks y Tecnologías Backend</h2>
                <div className="skills-category">
                  {filterSkills(backendSkills).length > 0 ? (
                    filterSkills(backendSkills).map((skill, index) => (
                      <div key={index} className="skill-item">
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-level">{skill.level}</span>
                        </div>
                        <div className="skill-bar">
                          <div className="skill-progress" style={{ width: skill.progress }}></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No hay habilidades backend registradas aún.</p>
                  )}
                </div>
              </div>

              <div className="skills-section">
                <h2 className="section-title">Bases de Datos</h2>
                <div className="skills-category">
                  {filterSkills(databaseSkills).map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: skill.progress }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="skills-section">
                <h2 className="section-title">Herramientas y DevOps</h2>
                <div className="skills-category">
                  {filterSkills(toolsSkills).map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: skill.progress }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="skills-sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-title">Niveles de Experiencia</h3>
                <div className="experience-levels">
                  <div className="level-item">
                    <span className="level-label">Principiante</span>
                    <span className="level-count">11</span>
                  </div>
                  <div className="level-item">
                    <span className="level-label">Intermedio</span>
                    <span className="level-count">0</span>
                  </div>
                  <div className="level-item">
                    <span className="level-label">Avanzado</span>
                    <span className="level-count">0</span>
                  </div>
                  <div className="level-item">
                    <span className="level-label">Experto</span>
                    <span className="level-count">0</span>
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

export default Skills
