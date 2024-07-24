import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const CostList = () => {
  const [costs, setCosts] = useState([]);

  useEffect(() => {
    api.get('/costs')
      .then(response => setCosts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Lista de Costos</h2>
      <Link to="/costs/new">Crear Nuevo Costo</Link>
      <ul>
        {costs.map(cost => (
          <li key={cost._id}>
            <Link to={`/costs/${cost._id}`}>{cost.tipo_gasto}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CostList;
