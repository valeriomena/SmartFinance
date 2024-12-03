import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../Routes/PrivateRoute';
import SalesProjectionCalculator from '@components/Calculators/SalesProjectionCalculator';
import ItemContainer from '../Container/ItemContainer';
import Home from '../Home'; // Importa el componente Home
import { fields } from '../../types/formFields';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* P�gina de Inicio */}
            <Route path="/" element={<Home />} />

            {/* Rutas Protegidas */}
            <Route
                path="/business"
                element={
                    <PrivateRoute>
                        <ItemContainer endpoint="/api/businesses" itemName="Negocio" fields={fields.business} />
                    </PrivateRoute>
                }
            />
            <Route
                path="/indicators"
                element={
                    <PrivateRoute>
                        <ItemContainer endpoint="/api/indicators" itemName="Indicador" fields={fields.indicator} />
                    </PrivateRoute>
                }
            />
            <Route
                path="/costs"
                element={
                    <PrivateRoute>
                        <ItemContainer endpoint="/api/costs" itemName="Costo" fields={fields.cost} />
                    </PrivateRoute>
                }
            />
            <Route
                path="/products"
                element={
                    <PrivateRoute>
                        <ItemContainer endpoint="/api/productServices" itemName="Producto" fields={fields.product} />
                    </PrivateRoute>
                }
            />
            <Route
                path="/reports"
                element={
                    <PrivateRoute>
                        <ItemContainer endpoint="/api/reports" itemName="Reporte" fields={fields.report} />
                    </PrivateRoute>
                }
            />
            <Route
                path="/sales-projection"
                element={<SalesProjectionCalculator />} // Renderiza el componente
            />
            <Route
                path="/sales"
                element={
                    <PrivateRoute>
                        <ItemContainer endpoint="/api/sales" itemName="Venta" fields={fields.sales} />
                    </PrivateRoute>
                }
            />

            {/* Ruta Desconocida */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
