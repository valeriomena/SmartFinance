import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/business">Negocios</Link></li>
        <li><Link to="/sales">Ventas</Link></li>
        <li><Link to="/products">Productos</Link></li>
        <li><Link to="/costs">Costos</Link></li>
        <li><Link to="/reports">Reportes</Link></li>
        <li><Link to="/indicators">Indicadores</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
