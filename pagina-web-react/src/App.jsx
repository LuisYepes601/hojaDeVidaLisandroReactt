import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Experience from './pages/Experience'
import Education from './pages/Education'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import AdminExperiences from './pages/AdminExperiences'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/experiencia" element={<Experience />} />
          <Route path="/admin-experiences" element={<AdminExperiences />} />
          <Route path="/educacion" element={<Education />} />
          <Route path="/habilidades" element={<Skills />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
