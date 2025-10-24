import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminExperiences.css';

const AdminExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExperience, setEditingExperience] = useState(null);
  const [activeTab, setActiveTab] = useState('form');

  // ✅ CONFIG
  const API_BASE_URL = 'https://hojadevidaapi.onrender.com/api/experiencias';
  const USER_ID = '68f69164c434421622bbbafc'; // ID del usuario fijo

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    period: '',
    location: '',
    description: '',
    achievements: '',
    technologies: ''
  });

  // ✅ Obtener experiencias del usuario
  const fetchExperiences = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/usuario/${USER_ID}`);
      if (!res.ok) throw new Error('Error al obtener experiencias');
      const data = await res.json();

      setExperiences(
        data.map(exp => ({
          id: exp._id,
          title: exp.titulo,
          company: exp.empresa,
          period: exp.periodo,
          location: exp.ubicacion,
          description: exp.descripcion,
          achievements: exp.logros,
          technologies: exp.tecnologias
        }))
      );
    } catch (error) {
      console.error('❌ Error al cargar experiencias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // ✅ Manejadores del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      period: '',
      location: '',
      description: '',
      achievements: '',
      technologies: ''
    });
    setEditingExperience(null);
  };

  // ✅ Crear o actualizar experiencia (editado)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const experienceData = {
      titulo: formData.title,
      empresa: formData.company,
      periodo: formData.period,
      ubicacion: formData.location,
      descripcion: formData.description,
      logros: formData.achievements,
      tecnologias: formData.technologies,
      usuarioReferencia: USER_ID
    };

    try {
      let url = `${API_BASE_URL}/crear`;
      let method = 'POST';

      // ✅ Si estamos editando, cambia el endpoint a actualizar
      if (editingExperience) {
        url = `${API_BASE_URL}/actualizar/${editingExperience.id}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(experienceData)
      });

      const responseData = await res.json();
      console.log('📥 Respuesta del servidor:', responseData);

      if (!res.ok) {
        alert(`❌ Error: ${responseData.message || 'No se pudo guardar la experiencia'}`);
        return;
      }

      // ✅ Actualiza la lista y reinicia el formulario
      await fetchExperiences();
      resetForm();
      setActiveTab('list');

      alert(editingExperience
        ? '✅ Experiencia actualizada correctamente'
        : '✅ Experiencia creada correctamente');

    } catch (error) {
      console.error('❌ Error al guardar la experiencia:', error);
      alert('❌ Error de conexión con la API');
    }
  };

  // ✅ Editar experiencia (cargar datos al formulario)
  const handleEdit = (experience) => {
    setFormData({
      title: experience.title,
      company: experience.company,
      period: experience.period,
      location: experience.location,
      description: experience.description,
      achievements: experience.achievements,
      technologies: experience.technologies
    });
    setEditingExperience(experience);
    setActiveTab('form');
  };

  // ✅ Eliminar experiencia
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta experiencia?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/eliminar/${id}`, { method: 'DELETE' });
      const responseData = await res.json();

      if (!res.ok) {
        alert(`❌ Error: ${responseData.message || 'No se pudo eliminar'}`);
        return;
      }

      setExperiences(experiences.filter(exp => exp.id !== id));
      alert('✅ Experiencia eliminada correctamente');
    } catch (error) {
      console.error('Error eliminando experiencia:', error);
      alert('❌ Error de conexión al eliminar.');
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <>
      <section className="admin-hero">
        <div className="container text-center">
          <h1 className="admin-title">Administrar Experiencias</h1>
          <p className="admin-subtitle">CRUD completo conectado a tu API</p>
          <Link to="/experiencia" className="btn-back">
            <i className="fas fa-arrow-left"></i> Volver
          </Link>
        </div>
      </section>

      <section className="admin-content">
        <div className="admin-container">
          {/* Tabs */}
          <ul className="nav nav-tabs admin-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'form' ? 'active' : ''}`}
                onClick={() => setActiveTab('form')}
              >
                {editingExperience ? 'Editar Experiencia' : 'Nueva Experiencia'}
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'list' ? 'active' : ''}`}
                onClick={() => setActiveTab('list')}
              >
                Lista de Experiencias
              </button>
            </li>
          </ul>

          {/* Formulario */}
          {activeTab === 'form' && (
            <div className="admin-form card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Título" className="form-control mb-3" required />
                      <input name="company" value={formData.company} onChange={handleInputChange} placeholder="Empresa" className="form-control mb-3" required />
                      <input name="period" value={formData.period} onChange={handleInputChange} placeholder="Período" className="form-control mb-3" required />
                      <input name="location" value={formData.location} onChange={handleInputChange} placeholder="Ubicación" className="form-control mb-3" required />
                    </div>
                    <div className="col-md-6">
                      <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Descripción" className="form-control mb-3" required />
                      <input name="achievements" value={formData.achievements} onChange={handleInputChange} placeholder="Logros (separados por coma)" className="form-control mb-3" />
                      <input name="technologies" value={formData.technologies} onChange={handleInputChange} placeholder="Tecnologías (separadas por coma)" className="form-control mb-3" />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {editingExperience ? 'Actualizar' : 'Crear'}
                  </button>
                  {editingExperience && (
                    <button type="button" onClick={resetForm} className="btn btn-secondary ms-2">
                      Cancelar
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* Lista */}
          {activeTab === 'list' && (
            <div className="card admin-table mt-4">
              <div className="card-body">
                {experiences.length === 0 ? (
                  <p>No hay experiencias registradas.</p>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Título</th>
                        <th>Empresa</th>
                        <th>Período</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {experiences.map(exp => (
                        <tr key={exp.id}>
                          <td>{exp.title}</td>
                          <td>{exp.company}</td>
                          <td>{exp.period}</td>
                          <td>
                            <button onClick={() => handleEdit(exp)} className="btn btn-warning btn-sm me-2">
                              Editar
                            </button>
                            <button onClick={() => handleDelete(exp.id)} className="btn btn-danger btn-sm">
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminExperiences;
