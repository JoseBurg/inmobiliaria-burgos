import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook para leer parámetros de la URL
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta
import './PropertyDetailPage.css'; // Crearemos este archivo para los estilos

function PropertyDetailPage() {
  const { id } = useParams(); // Obtiene el 'id' de la URL (ej: /propiedad/XYZ)
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const docRef = doc(db, 'properties', id); // Referencia al documento específico
        const docSnap = await getDoc(docRef); // Obtiene el documento

        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No se encontró la propiedad!");
        }
      } catch (error) {
        console.error("Error al obtener la propiedad:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]); // El efecto se ejecuta cada vez que el 'id' de la URL cambie

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!property) {
    return <div>Propiedad no encontrada.</div>;
  }

  return (
    <div className="property-detail-container">
      <h1>{property.title}</h1>
      <div className="property-detail-grid">
        <div className="detail-item">
          <strong>Tipo:</strong> {property.propertyType}
        </div>
        <div className="detail-item">
          <strong>Ubicación:</strong> {property.location}
        </div>
        <div className="detail-item price">
          <strong>Precio:</strong> ${property.price.toLocaleString()}
        </div>
        <div className="detail-item">
          <strong>Habitaciones:</strong> {property.rooms}
        </div>
        <div className="detail-item">
          <strong>Baños:</strong> {property.bathrooms}
        </div>
        <div className="detail-item">
          <strong>Área:</strong> {property.area} m²
        </div>
      </div>
      <div className="description">
        <h2>Descripción</h2>
        <p>{property.description}</p>
      </div>
    </div>
  );
}

export default PropertyDetailPage;