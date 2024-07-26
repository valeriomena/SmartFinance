// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
      <div className="home">
        <h1>Bienvenido a SmartFinance</h1>
        <p>Seleccione una de las siguientes opciones:</p>
        <ul>
          <li><Link to="/business">Negocios</Link></li>
          <li><Link to="/sales">Ventas</Link></li>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/costs">Costos</Link></li>
          <li><Link to="/reports">Reportes</Link></li>
          <li><Link to="/indicators">Indicadores Financieros</Link></li>
        </ul>
      </div>
  );
};

export default Home;
