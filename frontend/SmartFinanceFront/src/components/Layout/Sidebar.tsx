import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBusinessTime, faCashRegister, faBoxOpen, faFileInvoiceDollar, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@components/Auth/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { state } = useAuth();
  const selectedBusinessId = localStorage.getItem('selectedBusinessId');

  if (!state.token) {
    return null; // No mostrar la barra lateral si no hay token
  }

  return (
    <div className="sidebar Seychelle-Islands-bg-5">
      <ul>
        <li>
          <Link to="/" className={!selectedBusinessId ? 'disabled' : ''}>
            <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
            <span className="text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/business" className={!selectedBusinessId ? 'disabled' : ''}>
            <FontAwesomeIcon icon={faBusinessTime} className="icon" />
            <span className="text">Negocios</span>
          </Link>
        </li>
        <li>
          <Link to="/sales" className={!selectedBusinessId ? 'disabled' : ''}>
            <FontAwesomeIcon icon={faCashRegister} className="icon" />
            <span className="text">Ventas</span>
          </Link>
        </li>
        <li>
          <Link to="/products" className={!selectedBusinessId ? 'disabled' : ''}>
            <FontAwesomeIcon icon={faBoxOpen} className="icon" />
            <span className="text">Productos</span>
          </Link>
        </li>
        <li>
          <Link to="/costs" className={!selectedBusinessId ? 'disabled' : ''}>
            <FontAwesomeIcon icon={faFileInvoiceDollar} className="icon" />
            <span className="text">Costos</span>
          </Link>
        </li>
        <li>
          <Link to="/reports" className={!selectedBusinessId ? 'disabled' : ''}>
            <FontAwesomeIcon icon={faChartLine} className="icon" />
            <span className="text">Reportes</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
