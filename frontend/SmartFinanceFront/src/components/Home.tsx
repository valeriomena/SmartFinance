import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faChartLine, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    // Estados para manejar la visibilidad de las descripciones
    const [showRegisterInfo, setShowRegisterInfo] = useState(false);
    const [showAnalyzeInfo, setShowAnalyzeInfo] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 flex flex-col items-center text-white">
            {/* Header */}
            <header className="text-center mt-10 animate-fadeIn">
                <img
                    src="/src/Img/SF.svg"
                    alt="SmartFinance Logo"
                    className="mx-auto w-28 h-28 animate-bounce"
                />
                <h1 className="text-4xl font-bold mt-4 animate-slideIn">
                    SmartFinance
                </h1>
                <p className="text-xl italic mt-2 animate-fadeIn delay-300">
                    "Optimiza tus finanzas y toma decisiones inteligentes"
                </p>
            </header>

            {/* Botones principales */}
            <section className="mt-10 flex flex-col items-center gap-6">
                {/* Registrar tu negocio */}
                <div className="text-center">
                    <Link
                        to="/business"
                        className="flex items-center space-x-4 text-lg text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300"
                    >
                        <FontAwesomeIcon icon={faBriefcase} className="w-6 h-6 mr-2" />
                        Registrar tu negocio
                    </Link>
                    <button
                        onClick={() => setShowRegisterInfo(!showRegisterInfo)}
                        className="mt-2 text-sm text-gray-300 hover:underline"
                    >
                        <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                        Información
                    </button>
                    {showRegisterInfo && (
                        <p className="mt-2 text-sm bg-gray-700 p-3 rounded-md">
                            Al registrar un negocio podrás gestionar costos, productos, ventas,
                            y generar reportes personalizados para tomar mejores decisiones.
                        </p>
                    )}
                </div>

                {/* Analizar un negocio */}
                <div className="text-center">
                    <Link
                        to="/sales-projection"
                        className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                    >
                        <FontAwesomeIcon icon={faChartLine} className="w-6 h-6 mr-2" />
                        Analizar un negocio
                    </Link>
                    <button
                        onClick={() => setShowAnalyzeInfo(!showAnalyzeInfo)}
                        className="mt-2 text-sm text-gray-300 hover:underline"
                    >
                        <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                        Información
                    </button>
                    {showAnalyzeInfo && (
                        <p className="mt-2 text-sm bg-gray-700 p-3 rounded-md">
                            Analiza un negocio ya existente con nuestras herramientas de
                            cálculo y reportes en tiempo real para identificar oportunidades de mejora.
                        </p>
                    )}
                </div>
            </section>

            {/* Sección con columnas de beneficios */}
            <section className="mt-10 px-6 max-w-6xl flex flex-col md:flex-row gap-6 items-center">
                {/* Columna izquierda: Beneficios */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-6 animate-slideIn">
                        Beneficios Principales
                    </h2>
                    <ul className="space-y-4 text-lg animate-fadeIn">
                        <li>
                            <strong>Gestión Financiera Eficiente:</strong> Lleva un control claro
                            de tus costos, ingresos y resultados.
                        </li>
                        <li>
                            <strong>Análisis en Tiempo Real:</strong> Calculadoras y reportes
                            personalizados.
                        </li>
                        <li>
                            <strong>Todo en un Solo Lugar:</strong> Negocios, ventas, productos
                            y más.
                        </li>
                    </ul>
                </div>

                {/* Línea divisoria */}
                <div className="hidden md:block w-px bg-gray-300 h-auto"></div>

                {/* Columna derecha: Características */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-6 animate-slideIn">
                        Características
                    </h2>
                    <ul className="space-y-4 text-lg animate-fadeIn">
                        <li>Control centralizado por negocio.</li>
                        <li>Herramientas interactivas (como calculadoras de costos y precios).</li>
                        <li>Acceso seguro con autenticación basada en tokens.</li>
                    </ul>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-16 text-sm text-gray-300 animate-fadeIn delay-700">
                © 2024 SmartFinance. Todos los derechos reservados.
            </footer>
        </div>
    );
};

export default Home;
