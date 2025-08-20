import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importa Link
import './PropertyCard.css';

function PropertyCard({ property }) {
  return (
    // 2. Envuelve toda la tarjeta en un Link que dirige a la ruta dinámica
    <Link to={`/propiedad/${property.id}`} className="property-card-link">
      <div className="property-card">
        <div className="card-content">
          <h3>{property.title}</h3>
          <p><strong>Tipo:</strong> {property.propertyType}</p>
          <p><strong>Ubicación:</strong> {property.location}</p>
          <p><strong>Precio:</strong> ${property.price.toLocaleString()}</p>
          <p><strong>Habitaciones:</strong> {property.rooms}</p>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;