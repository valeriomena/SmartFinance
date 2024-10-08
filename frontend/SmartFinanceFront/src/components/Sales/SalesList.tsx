// src/components/Sales/SalesList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const SalesList = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    api.get('/sales')
      .then(response => setSales(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Lista de Ventas</h2>
      <div className="menu">
        <Link to="/sales/new">Crear Nueva Venta</Link>
        <Link to="/sales/projection" style={{ marginLeft: '1rem' }}>Proyección de Ventas</Link>
      </div>
      <ul>
        {sales.map(sale => (
          <li key={sale._id}>
            <Link to={`/sales/${sale._id}`}>{sale.fecha}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesList;
