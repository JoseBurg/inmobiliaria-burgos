import React from 'react';
import './PropertyCard.css';

function PropertyCard({ property }) {
  return (
    <div className="property-card">
      {/* Hemos eliminado la etiqueta <img> */}
      <div className="card-content">
        <h3>{property.title}</h3>
        <p><strong>Ubicación:</strong> {property.location}</p>
        <p><strong>Precio:</strong> ${property.price.toLocaleString()}</p>
        <p><strong>Habitaciones:</strong> {property.rooms}</p>
      </div>
    </div>
  );
}

export default PropertyCard;