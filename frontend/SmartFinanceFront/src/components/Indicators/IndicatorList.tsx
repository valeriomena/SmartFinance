import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const IndicatorList = () => {
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    api.get('/indicators')
      .then(response => setIndicators(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Lista de Indicadores</h2>
      <Link to="/indicators/new">Crear Nuevo Indicador</Link>
      <ul>
        {indicators.map(indicator => (
          <li key={indicator._id}>
            <Link to={`/indicators/${indicator._id}`}>{indicator.fecha}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndicatorList;

