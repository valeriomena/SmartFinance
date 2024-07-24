import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);

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
          <li key={business._id}>
            <Link to={`/business/${business._id}`}>{business.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessList;
