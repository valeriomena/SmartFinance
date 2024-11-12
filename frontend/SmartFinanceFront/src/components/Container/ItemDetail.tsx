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

  // Determinar el tipo de ítem basado en el endpoint actual
  const itemType = useMemo(() => {
    switch (true) {
      case endpoint.includes('/businesses'):
        return 'business';
      case endpoint.includes('/indicators'):
        return 'indicator';
      case endpoint.includes('/costs'):
        return 'cost';
      case endpoint.includes('/productServices'):
        return 'product';
      case endpoint.includes('/reports'):
        return 'report';
      case endpoint.includes('/sales'):
        return 'sales';
      default:
        return null;
    }
  }, [endpoint]);

  // Obtener los campos correspondientes al tipo de ítem
  const itemFields: Field[] = itemType ? fields[itemType] : [];

  if (!selectedItem) return <p>Selecciona un ítem para ver sus detalles.</p>;
  if (!itemType) return <p>No se pudo determinar el tipo de ítem.</p>;

  return (
    <div className="item-detail">
      <h2>Detalles de {selectedItem.name}</h2>
      <p>
        <strong>ID:</strong> {selectedItem._id}
      </p>

      {/* Renderizar dinámicamente los campos definidos en `formFields.ts` */}
      {itemFields.map((field) => (
        <div key={field.name} className="item-detail-field">
          <strong>{field.label}:</strong>{' '}
          {selectedItem[field.name] ?? <span className="placeholder">N/A</span>}
        </div>
      ))}
    </div>
  );
};

export default ItemDetail;
