import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import useSmoothScroll from '../hooks/useSmoothScroll'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Enable smooth scroll for anchor links
  useSmoothScroll()

  useEffect(() => {
    // Cerrar menú móvil cuando cambia la ruta
    setIsMenuOpen(false)
  }, [location])

  useEffect(() => {
    // Cerrar menú móvil al hacer clic fuera
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar') && !event.target.closest('.hamburger')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="app">
      <Header
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        currentPath={location.pathname}
      />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
