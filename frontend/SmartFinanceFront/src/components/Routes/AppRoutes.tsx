import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../Routes/PrivateRoute';
import ItemContainer from '../Container/ItemContainer';
import { fields } from '../../types/formFields';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
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
        path="/sales"
        element={
          <PrivateRoute>
            <ItemContainer endpoint="/api/sales" itemName="Venta" fields={fields.sales} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
