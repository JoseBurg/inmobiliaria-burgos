import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Importaciones solo de Firestore
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from './firebaseConfig'; // Ya no importamos 'storage'

import PropertyCard from './components/PropertyCard';
import AddPropertyForm from './components/AddPropertyForm';
import './App.css';

// ----- DEFINICIÓN DE PÁGINAS O VISTAS -----

function HomePage({ properties }) {
  return (
    <div>
      <h1 className="main-title">Propiedades Disponibles</h1>
      <div className="property-list">
        {properties.map(prop => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
    </div>
  );
}

function AdminPage({ properties, onAddProperty, onStatusChange, onDeleteProperty }) {
  return (
    <div>
      <AddPropertyForm onAddProperty={onAddProperty} />
      <div className="admin-dashboard">
        <h2>Panel de Administración de Propiedades</h2>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(prop => (
              <tr key={prop.id}>
                <td>{prop.title}</td>
                <td>
                  <select 
                    value={prop.status} 
                    onChange={(e) => onStatusChange(prop.id, e.target.value)}
                    className={`status-select status-${prop.status?.toLowerCase()}`}
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Separado">Separado</option>
                    <option value="Vendido">Vendido</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="delete-button" 
                    onClick={() => onDeleteProperty(prop.id)} // Ya no pasamos imageUrl
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----- COMPONENTE PRINCIPAL DE LA APP -----

function App() {
  const [properties, setProperties] = useState([]);
  const propertiesCollectionRef = collection(db, "properties");

  const getProperties = async () => {
    try {
      const q = query(propertiesCollectionRef, orderBy("createdAt", "desc"));
      const data = await getDocs(q);
      const propertiesData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProperties(propertiesData);
    } catch (error) {
      console.error("Error al cargar las propiedades:", error);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  // ---- FUNCIÓN addProperty SIMPLIFICADA ----
  const addProperty = async (formData) => {
    try {
      const propertyData = {
        ...formData,
        status: 'Disponible',
        createdAt: new Date()
      };
      await addDoc(propertiesCollectionRef, propertyData);
      getProperties(); // Recargamos para ver el nuevo registro
    } catch (error) {
      console.error("Error al agregar la propiedad:", error);
      alert("No se pudo guardar el registro. Revisa la consola para ver el error.");
    }
  };
  
  const handleStatusChange = async (id, newStatus) => {
    const propertyDoc = doc(db, "properties", id);
    try {
      await updateDoc(propertyDoc, { status: newStatus });
      getProperties();
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  // ---- FUNCIÓN handleDeleteProperty SIMPLIFICADA ----
  const handleDeleteProperty = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta propiedad?");
    if (!confirmDelete) return;

    try {
      // Ya no hay que borrar imagen de Storage
      const propertyDoc = doc(db, "properties", id);
      await deleteDoc(propertyDoc);
      setProperties(properties.filter((prop) => prop.id !== id));
    } catch (error) {
      console.error("Error al eliminar la propiedad:", error);
    }
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/">Inmobiliaria React</Link>
          <div className="nav-links">
            <Link to="/">Inicio</Link>
            <Link to="/admin">Panel de Admin</Link>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage properties={properties} />} />
            <Route 
              path="/admin" 
              element={
                <AdminPage 
                  properties={properties} 
                  onAddProperty={addProperty}
                  onStatusChange={handleStatusChange}
                  onDeleteProperty={handleDeleteProperty}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;