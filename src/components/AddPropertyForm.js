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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price) {
      alert('Por favor, completa al menos el título y el precio.');
      return;
    }

    const formData = { title, location, price: Number(price), rooms: Number(rooms), bathrooms: Number(bathrooms), area: Number(area), description };
    
    // Ahora solo pasamos los datos del formulario, sin el archivo de imagen
    onAddProperty(formData);

    // Limpiar el formulario
    setTitle('');
    setLocation('');
    setPrice('');
    setRooms('');
    setBathrooms('');
    setArea('');
    setDescription('');
  };

  return (
    <form className="add-property-form" onSubmit={handleSubmit}>
      <h2>Agregar Nueva Propiedad</h2>
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Ubicación" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="number" placeholder="Precio (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="number" placeholder="Habitaciones" value={rooms} onChange={(e) => setRooms(e.target.value)} />
      <input type="number" placeholder="Baños" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
      <input type="number" placeholder="Área (m²)" value={area} onChange={(e) => setArea(e.target.value)} />
      <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
      
      {/* Hemos eliminado el input para la foto */}

      <button type="submit">Agregar Propiedad</button>
    </form>
  );
}

export default AddPropertyForm;