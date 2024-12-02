// hooks/useItemEditManager.ts
import { useState, useEffect } from 'react';

interface Item {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  [key: string]: any;
}

export const useItemEditManager = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const startEditingItem = (item: Item) => {
    setSelectedItem(item); // Almacena el ítem que se está editando
  };

  const clearEditingItem = () => {
    setSelectedItem(null); // Limpia el ítem al terminar de editar
  };

  return { selectedItem, startEditingItem, clearEditingItem };
};
