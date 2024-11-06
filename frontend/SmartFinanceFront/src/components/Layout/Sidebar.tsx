// Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBusinessTime, faCashRegister, faBoxOpen, faFileInvoiceDollar, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@components/Auth/AuthContext';
import { useEndpoint } from '../../contexts/EndpointContext'; 
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { state } = useAuth();
  const { token, selectedBusinessId } = state;
  const { setEndpoint } = useEndpoint(); 
  console.log('selectedBusinessId:', selectedBusinessId);

  if (!token) {
    console.log('Sidebar hidden due to missing token');
    return null; // No mostrar la barra lateral si no hay token
  }

  const handleClick = (endpoint: string) => {
    setEndpoint(endpoint);
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/" className={!selectedBusinessId ? 'disabled' : ''} onClick={() => handleClick('/api/dashboard')}>
            <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
            <span className="text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/business" onClick={() => handleClick('/api/business')}>
            <FontAwesomeIcon icon={faBusinessTime} className="icon" />
            <span className="text">Negocios</span>
          </Link>
        </li>
        <li>
          <Link to="/sales" className={!selectedBusinessId ? 'disabled' : ''} onClick={() => handleClick('/api/sales')}>
            <FontAwesomeIcon icon={faCashRegister} className="icon" />
            <span className="text">Ventas</span>
          </Link>
        </li>
        <li>
          <Link to="/products" className={!selectedBusinessId ? 'disabled' : ''} onClick={() => handleClick('/api/products')}>
            <FontAwesomeIcon icon={faBoxOpen} className="icon" />
            <span className="text">Productos</span>
          </Link>
        </li>
        <li>
          <Link to="/costs" className={!selectedBusinessId ? 'disabled' : ''} onClick={() => handleClick('/api/costs')}>
            <FontAwesomeIcon icon={faFileInvoiceDollar} className="icon" />
            <span className="text">Costos</span>
          </Link>
        </li>
        <li>
          <Link to="/reports" className={!selectedBusinessId ? 'disabled' : ''} onClick={() => handleClick('/api/reports')}>
            <FontAwesomeIcon icon={faChartLine} className="icon" />
            <span className="text">Reportes</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
