import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalles del Producto</h2>
      <p><strong>Nombre:</strong> {product.name}</p>
      <p><strong>Descripción:</strong> {product.description}</p>
      <p><strong>Precio:</strong> {product.price}</p>
      {/* Otros detalles */}
    </div>
  );
};

export default ProductDetail;
