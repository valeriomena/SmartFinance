import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBusinessTime, faCashRegister, faBoxOpen, faFileInvoiceDollar, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@components/Auth/AuthContext';
import { toggleTheme } from '../../themeToggle';
import { useEndpoint } from '../../contexts/EndpointContext';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const { state } = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { token } = state;
    const { selectedBusinessId, setEndpoint } = useEndpoint();

    const handleToggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        toggleTheme();
    };

    const handleClick = (endpoint: string) => {
        setEndpoint(endpoint);
    };

    if (!token) {
        console.log('Sidebar hidden due to missing token');
        return null;
    }

    return (
        <div className="sidebar bg-white dark:bg-gray-800 shadow-lg min-h-screen flex flex-col justify-between w-16 hover:w-64">
            <ul className="space-y-6 p-6">
                {/* Dashboard Link */}
                <li>
                    <Link
                        to="/"
                        className={`flex items-center space-x-4 text-lg text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 ${!selectedBusinessId ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={() => handleClick('/api/dashboard')}
                    >
                        <FontAwesomeIcon icon={faTachometerAlt} className="w-6 h-6" />
                        <span className="text">Dashboard</span>
                    </Link>
                </li>

                {/* Negocios Link */}
                <li>
                    <Link
                        to="/business"
                        className={`flex items-center space-x-4 text-lg text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300`}
                        onClick={() => handleClick('/api/businesses')}
                    >
                        <FontAwesomeIcon icon={faBusinessTime} className="w-6 h-6" />
                        <span className="text">Negocios</span>
                    </Link>
                </li>

                {/* Ventas Link */}
                <li>
                    <Link
                        to="/sales"
                        className={`flex items-center space-x-4 text-lg text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 ${!selectedBusinessId ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={() => handleClick('/api/sales')}
                    >
                        <FontAwesomeIcon icon={faCashRegister} className="w-6 h-6" />
                        <span className="text">Ventas</span>
                    </Link>
                </li>

                {/* Productos Link */}
                <li>
                    <Link
                        to="/products"
                        className={`flex items-center space-x-4 text-lg text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 ${!selectedBusinessId ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={() => handleClick('/api/products')}
                    >
                        <FontAwesomeIcon icon={faBoxOpen} className="w-6 h-6" />
                        <span className="text">Productos</span>
                    </Link>
                </li>

                {/* Costos Link */}
                <li>
                    <Link
                        to="/costs"
                        className={`flex items-center space-x-4 text-lg text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 ${!selectedBusinessId ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={() => handleClick('/api/costs')}
                    >
                        <FontAwesomeIcon icon={faFileInvoiceDollar} className="w-6 h-6" />
                        <span className="text">Costos</span>
                    </Link>
                </li>

                {/* Reportes Link */}
                <li>
                    <Link
                        to="/reports"
                        className={`flex items-center space-x-4 text-lg text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 ${!selectedBusinessId ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={() => handleClick('/api/reports')}
                    >
                        <FontAwesomeIcon icon={faChartLine} className="w-6 h-6" />
                        <span className="text">Reportes</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
