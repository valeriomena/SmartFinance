// src/components/ItemDetail.tsx
import React, { useMemo } from 'react';
import { useEndpoint } from '../../contexts/EndpointContext';
import { Field, fields } from '../../types/formFields';
import '../../styles/ItemDetail.css';

interface Item {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  [key: string]: any;
}

interface ItemDetailProps {
  selectedItem: Item | null;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ selectedItem }) => {
  const { endpoint } = useEndpoint();

  // Obtener el tipo de ítem basado en el endpoint actual
  const itemType = useMemo(() => {
    if (endpoint.includes('/businesses')) return 'business';
    if (endpoint.includes('/indicators')) return 'indicator';
    if (endpoint.includes('/costs')) return 'cost';
    if (endpoint.includes('/productServices')) return 'product';
    if (endpoint.includes('/reports')) return 'report';
    if (endpoint.includes('/sales')) return 'sales';
    return null;
  }, [endpoint]);

  // Obtener los campos según el tipo de ítem
  const itemFields: Field[] | undefined = itemType ? fields[itemType] : [];

  if (!selectedItem) return <p>Selecciona un ítem para ver sus detalles.</p>;

  return (
    <div className="item-detail">
      <h2>Detalles de {selectedItem.name}</h2>
      <p><strong>ID:</strong> {selectedItem._id}</p>
      {itemFields?.map((field) => (
        <div key={field.name} className="item-detail-field">
          <strong>{field.label}:</strong> {selectedItem[field.name] ?? 'N/A'}
        </div>
      ))}
    </div>
  );
};

export default ItemDetail;
