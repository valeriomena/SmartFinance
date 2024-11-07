// ../../components/ItemDetail.tsx
import React from 'react';

interface ItemDetailProps {
  item: {
    name: string;
    description?: string;
    price?: number;
    [key: string]: any; // Permite otros campos dinámicos
  };
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item }) => {
  if (!item) {
    return <p>Selecciona un ítem para ver sus detalles.</p>;
  }

  return (
    <div className="item-detail">
      <h2>Detalles de {item.name}</h2>
      <p>ID: {item._id}</p>
      {item.description && <p>Descripción: {item.description}</p>}
      {item.price && <p>Precio: {item.price}</p>}
      {/* Agrega aquí más campos según el esquema del ítem */}
      {Object.keys(item).map((key) =>
        key !== "_id" && key !== "name" && key !== "description" && key !== "price" ? (
          <p key={key}>{`${key}: ${item[key]}`}</p>
        ) : null
      )}
    </div>
  );
};

export default ItemDetail;
