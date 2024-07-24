import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Reemplazar useHistory con useNavigate
import api from '../../services/api';

const SalesForm: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]); // Ajuste de tipos
  const [businessId, setBusinessId] = useState('');
  const [productServiceId, setProductServiceId] = useState('');
  const [fecha, setFecha] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [cantidadVendida, setCantidadVendida] = useState('');
  const [ingresoTotal, setIngresoTotal] = useState('');
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  useEffect(() => {
    api.get('/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/sales', {
        businessId,
        productServiceId,
        fecha,
        precio_venta: precioVenta,
        cantidad_vendida: cantidadVendida,
        ingreso_total: ingresoTotal
      });
      navigate('/sales'); // Usar navigate en lugar de history.push
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Crear Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Negocio:</label>
          <input type="text" value={businessId} onChange={(e) => setBusinessId(e.target.value)} required />
        </div>
        <div>
          <label>Producto/Servicio:</label>
          <select value={productServiceId} onChange={(e) => setProductServiceId(e.target.value)} required>
            {products.map(product => (
              <option key={product._id} value={product._id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Fecha:</label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        </div>
        <div>
          <label>Precio Venta:</label>
          <input type="number" value={precioVenta} onChange={(e) => setPrecioVenta(e.target.value)} required />
        </div>
        <div>
          <label>Cantidad Vendida:</label>
          <input type="number" value={cantidadVendida} onChange={(e) => setCantidadVendida(e.target.value)} required />
        </div>
        <div>
          <label>Ingreso Total:</label>
          <input type="number" value={ingresoTotal} onChange={(e) => setIngresoTotal(e.target.value)} required />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default SalesForm;
