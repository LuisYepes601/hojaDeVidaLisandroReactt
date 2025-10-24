import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ isMenuOpen, toggleMenu, currentPath }) => {
  const navItems = [
    { path: '/', label: 'Inicio', icon: 'fas fa-home' },
    { path: '/perfil', label: 'Perfil', icon: 'fas fa-user' },
    { path: '/experiencia', label: 'Experiencia', icon: 'fas fa-briefcase' },
    { path: '/educacion', label: 'Educación', icon: 'fas fa-graduation-cap' },
    { path: '/habilidades', label: 'Habilidades', icon: 'fas fa-code' },
    { path: '/contacto', label: 'Contacto', icon: 'fas fa-envelope' }
  ]

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/" className="nav-link">
            <h1>Lisandro Herrera</h1>
          </Link>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${currentPath === item.path ? 'active' : ''}`}
              >
                <i className={item.icon}></i> {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  )
}

export default Header
