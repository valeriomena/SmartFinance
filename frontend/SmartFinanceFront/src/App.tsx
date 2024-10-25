import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/Routes/PrivateRoute';
import ItemContainer from './components/Container/ItemContainer';

const App: React.FC = () => {
  const businessFields = [
    { name: 'name', label: 'Nombre', type: 'text' as const, required: true, validationMessage: 'El nombre es obligatorio' },
    { name: 'description', label: 'Descripción', type: 'text' as const, required: false, validationMessage: '' },
  ];

  const indicatorFields = [
    { name: 'businessId', label: 'ID del Negocio', type: 'text' as const, required: true, validationMessage: 'El ID es obligatorio' },
    { name: 'fecha', label: 'Fecha', type: 'date' as const, required: true, validationMessage: 'La fecha es obligatoria' },
    { name: 'beneficioBruto', label: 'Beneficio Bruto', type: 'number' as const, required: true, validationMessage: 'Campo requerido' },
    { name: 'beneficioNeto', label: 'Beneficio Neto', type: 'number' as const, required: true, validationMessage: 'Campo requerido' },
    { name: 'margenBeneficioBruto', label: 'Margen Beneficio Bruto', type: 'number' as const, required: true, validationMessage: 'Campo requerido' },
    { name: 'margenBeneficioNeto', label: 'Margen Beneficio Neto', type: 'number' as const, required: true, validationMessage: 'Campo requerido' },
  ];

  const costFields = [
    { name: 'businessId', label: 'ID del Negocio', type: 'text' as const, required: true, validationMessage: 'El ID del negocio es obligatorio' },
    { name: 'tipoGasto', label: 'Tipo de Gasto', type: 'text' as const, required: true, validationMessage: 'El tipo de gasto es obligatorio' },
    { name: 'monto', label: 'Monto', type: 'number' as const, required: true, validationMessage: 'El monto es obligatorio' },
  ];

  const productFields = [
    { name: 'name', label: 'Nombre', type: 'text' as const, required: true, validationMessage: 'El nombre es obligatorio' },
    { name: 'description', label: 'Descripción', type: 'text' as const, required: false, validationMessage: '' },
    { name: 'price', label: 'Precio', type: 'number' as const, required: true, validationMessage: 'El precio es obligatorio' },
    { name: 'businessId', label: 'ID del Negocio', type: 'text' as const, required: true, validationMessage: 'El ID del negocio es obligatorio' },
  ];

  const reportFields = [
    { name: 'businessId', label: 'ID del Negocio', type: 'text' as const, required: true, validationMessage: 'El ID del negocio es obligatorio' },
    { name: 'periodo', label: 'Periodo', type: 'text' as const, required: true, validationMessage: 'El periodo es obligatorio' },
    { name: 'ingresos', label: 'Ingresos', type: 'number' as const, required: true, validationMessage: 'Los ingresos son obligatorios' },
    { name: 'costos', label: 'Costos', type: 'number' as const, required: true, validationMessage: 'Los costos son obligatorios' },
    { name: 'gastosOperativos', label: 'Gastos Operativos', type: 'number' as const, required: true, validationMessage: 'Los gastos operativos son obligatorios' },
    { name: 'gastosFinancieros', label: 'Gastos Financieros', type: 'number' as const, required: true, validationMessage: 'Los gastos financieros son obligatorios' },
    { name: 'beneficioBruto', label: 'Beneficio Bruto', type: 'number' as const, required: true, validationMessage: 'El beneficio bruto es obligatorio' },
    { name: 'beneficioNeto', label: 'Beneficio Neto', type: 'number' as const, required: true, validationMessage: 'El beneficio neto es obligatorio' },
  ];

  const salesFields = [
    { name: 'businessId', label: 'ID del Negocio', type: 'text' as const, required: true, validationMessage: 'El ID del negocio es obligatorio' },
    { name: 'productServiceId', label: 'Producto/Servicio', type: 'text' as const, required: true, validationMessage: 'El producto/servicio es obligatorio' },
    { name: 'fecha', label: 'Fecha', type: 'date' as const, required: true, validationMessage: 'La fecha es obligatoria' },
    { name: 'precioVenta', label: 'Precio de Venta', type: 'number' as const, required: true, validationMessage: 'El precio de venta es obligatorio' },
    { name: 'cantidadVendida', label: 'Cantidad Vendida', type: 'number' as const, required: true, validationMessage: 'La cantidad vendida es obligatoria' },
    { name: 'ingresoTotal', label: 'Ingreso Total', type: 'number' as const, required: true, validationMessage: 'El ingreso total es obligatorio' },
  ];

  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route
              path="/business"
              element={
                <PrivateRoute>
                  <ItemContainer endpoint="/api/businesses" itemName="Negocio" fields={businessFields} />
                </PrivateRoute>
              }
            />
            <Route
              path="/indicators"
              element={
                <PrivateRoute>
                  <ItemContainer endpoint="/api/indicators" itemName="Indicador" fields={indicatorFields} />
                </PrivateRoute>
              }
            />
            <Route
              path="/costs"
              element={
                <PrivateRoute>
                  <ItemContainer endpoint="/api/costs" itemName="Costo" fields={costFields} />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <ItemContainer endpoint="/api/products" itemName="Producto" fields={productFields} />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <PrivateRoute>
                  <ItemContainer endpoint="/api/reports" itemName="Reporte" fields={reportFields} />
                </PrivateRoute>
              }
            />
            <Route
              path="/sales"
              element={
                <PrivateRoute>
                  <ItemContainer endpoint="/api/sales" itemName="Venta" fields={salesFields} />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
