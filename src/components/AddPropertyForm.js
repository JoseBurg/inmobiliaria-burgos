import React, { useState } from 'react';
import './AddPropertyForm.css';

function AddPropertyForm({ onAddProperty }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [rooms, setRooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [propertyType, setPropertyType] = useState('Apartamento');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price) {
      alert('Por favor, completa al menos el título y el precio.');
      return;
    }
    const formData = { 
      title, location, price: Number(price), 
      rooms: Number(rooms), bathrooms: Number(bathrooms), 
      area: Number(area), description, propertyType
    };
    onAddProperty(formData);
    // Limpiar el formulario
    setTitle('');
    setLocation('');
    setPrice('');
    setRooms('');
    setBathrooms('');
    setArea('');
    setDescription('');
    setPropertyType('Apartamento');
  };

  return (
    <form className="add-property-form" onSubmit={handleSubmit}>
      <h2>Ingresar propiedad</h2>
      
      {/* Campos de texto principales */}
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Ubicación" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="number" placeholder="Precio (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="number" placeholder="Habitaciones" value={rooms} onChange={(e) => setRooms(e.target.value)} />
      <input type="number" placeholder="Baños" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
      <input type="number" placeholder="Área (m²)" value={area} onChange={(e) => setArea(e.target.value)} />
      
      {/* Contenedor separado para los botones de tipo de propiedad */}
      <label> </label>
      <div className="property-type-buttons">
        <button 
          type="button"
          className={`property-type-button ${propertyType === 'Apartamento' ? 'active' : ''}`}
          onClick={() => setPropertyType('Apartamento')}>
          Apartamento
        </button>
        <button 
          type="button"
          className={`property-type-button ${propertyType === 'Casa' ? 'active' : ''}`}
          onClick={() => setPropertyType('Casa')}>
          Casa
        </button>
        <button 
          type="button"
          className={`property-type-button ${propertyType === 'Local Comercial' ? 'active' : ''}`}
          onClick={() => setPropertyType('Local Comercial')}>
          Local Comercial
        </button>
        <button 
          type="button"
          className={`property-type-button ${propertyType === 'Solar' ? 'active' : ''}`}
          onClick={() => setPropertyType('Solar')}>
          Solar
        </button>
      </div>
      <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
      <br></br>

      <button type="submit">Agregar propiedad</button>
    </form>
  );
}

export default AddPropertyForm;