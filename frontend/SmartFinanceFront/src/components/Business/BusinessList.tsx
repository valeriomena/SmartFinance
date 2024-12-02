import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

// Definir el tipo de negocio
interface Business {
  _id: string;
  name: string;
}

const BusinessList = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]); // Definir tipo de negocio como array

  useEffect(() => {
    api.get('/businesses')
      .then(response => setBusinesses(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Lista de Negocios</h2>
      <Link to="/business/new">Crear Nuevo Negocio</Link>
      <ul>
        {businesses.map(business => (
          <li key={business._id} style={{ position: 'relative' }}>
            <Link to={`/business/${business._id}`}>{business.name}</Link>
            <div 
              className="business-card" 
              style={{
                display: 'none', 
                position: 'absolute', 
                top: '100%', 
                left: '0', 
                backgroundColor: '#fff', 
                padding: '10px', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              <p>{business.name}</p>
              <p>Más detalles...</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessList;
