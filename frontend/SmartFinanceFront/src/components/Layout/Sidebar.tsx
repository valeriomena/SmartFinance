import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBusinessTime, faCashRegister, faBoxOpen, faFileInvoiceDollar, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@components/Auth/AuthContext';
//import { useAuth } from './AuthContext'; // Importa el contexto de autenticación
import './Sidebar.css';

const Sidebar = () => {
  const { token } = useAuth(); // Obtén el token desde el contexto

  if (!token) {
    return null; // No mostrar la barra lateral si no hay token
  }

  return (
    <div className="sidebar Seychelle-Islands-bg-5">
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
            <span className="text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/business">
            <FontAwesomeIcon icon={faBusinessTime} className="icon" />
            <span className="text">Negocios</span>
          </Link>
        </li>
        <li>
          <Link to="/sales">
            <FontAwesomeIcon icon={faCashRegister} className="icon" />
            <span className="text">Ventas</span>
          </Link>
        </li>
        <li>
          <Link to="/products">
            <FontAwesomeIcon icon={faBoxOpen} className="icon" />
            <span className="text">Productos</span>
          </Link>
        </li>
        <li>
          <Link to="/costs">
            <FontAwesomeIcon icon={faFileInvoiceDollar} className="icon" />
            <span className="text">Costos</span>
          </Link>
        </li>
        <li>
          <Link to="/reports">
            <FontAwesomeIcon icon={faChartLine} className="icon" />
            <span className="text">Reportes</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
