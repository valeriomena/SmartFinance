import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import axios from 'axios';

interface Item {
  _id: string;
  name: string;
}

interface ItemListProps {
  endpoint: string;
  itemName: string;
  userId: string | null; // Recibe el userId como prop
  onSelectItem: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ endpoint, itemName, userId, onSelectItem }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('User ID:', userId);
    const token = localStorage.getItem('token');
    console.log('Token de ItemList:', token);

    const fetchItems = async () => {
      if (userId) {
        try {
          const url = `${endpoint}?userId=${userId}`;
          console.log('Fetching items from:', url);

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await api.get<Item[]>(url, { headers });
          console.log('Data recibida:', response.data);
          setItems(response.data);
        } catch (error) {
          console.error('Error al obtener los elementos:', error);
          
          // Manejo del error como unknown
          if (axios.isAxiosError(error)) {
            // Manejar el error de Axios
            const errorMessage = error.response?.data?.message || 'Hubo un error al cargar los elementos.';
            setError(errorMessage);
          } else {
            // Manejar cualquier otro tipo de error
            setError('Hubo un error al cargar los elementos.');
          }
        } finally {
          setLoading(false);
        }
      } else {
        setError('No se proporcionó userId.');
        setLoading(false);
      }
    };

    fetchItems();
  }, [endpoint, userId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="info-error">{error}</p>;

  return (
    <div>
      <h2>Lista de {itemName}</h2>
      <Link to={`/${itemName.toLowerCase()}/new`}>Crear Nuevo {itemName}</Link>
      <ul>
        {items.map((item) => (
          <li
            key={item._id}
            onClick={() => onSelectItem(item._id)}
            style={{ cursor: 'pointer', padding: '8px', border: '1px solid #ddd', marginBottom: '5px' }}
          >
            <Link to={`/${itemName.toLowerCase()}/${item._id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
