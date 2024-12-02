import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faTag, faCalendarDay, faDollarSign, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import SalesProjection from './SalesProjection';
import '../../styles/Form.css'; // Importa los estilos del formulario

const SalesForm: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [businessId, setBusinessId] = useState('');
  const [productServiceId, setProductServiceId] = useState('');
  const [fecha, setFecha] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [cantidadVendida, setCantidadVendida] = useState('');
  const [ingresoTotal, setIngresoTotal] = useState('');
  const [showProjection, setShowProjection] = useState(false);
  const navigate = useNavigate();

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
      navigate('/sales');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nueva Venta</h2>
      <div className="menu">
        <button onClick={() => setShowProjection(true)} style={{ marginBottom: '1rem' }}>Proyección de Ventas</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FontAwesomeIcon icon={faStore} />
          <input
            type="text"
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            placeholder="ID del negocio"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faTag} />
          <select
            value={productServiceId}
            onChange={(e) => setProductServiceId(e.target.value)}
            required
          >
            <option value="">Seleccionar producto/servicio</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faCalendarDay} />
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faDollarSign} />
          <input
            type="number"
            value={precioVenta}
            onChange={(e) => setPrecioVenta(e.target.value)}
            placeholder="Precio de Venta"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faSortAmountUp} />
          <input
            type="number"
            value={cantidadVendida}
            onChange={(e) => setCantidadVendida(e.target.value)}
            placeholder="Cantidad Vendida"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faDollarSign} />
          <input
            type="number"
            value={ingresoTotal}
            onChange={(e) => setIngresoTotal(e.target.value)}
            placeholder="Ingreso Total"
            required
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
      {showProjection && (
        <div className="projection-container">
          <SalesProjection />
          <button onClick={() => setShowProjection(false)}>Cerrar Proyección</button>
        </div>
      )}
    </div>
  );
};

export default SalesForm;
