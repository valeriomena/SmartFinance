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

    const itemFields: Field[] = itemType ? fields[itemType] : [];

    if (!selectedItem) return <p className="text-gray-500">Selecciona un ítem para ver sus detalles.</p>;
    if (!itemType) return <p className="text-red-500">No se pudo determinar el tipo de ítem.</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-4">Detalles de {selectedItem.name}</h2>
            <p className="text-sm"><strong>ID:</strong> {selectedItem._id}</p>
            <div className="mt-4 space-y-2">
                {itemFields.map((field) => (
                    <div key={field.name} className="flex items-center space-x-2">
                        <strong className="text-sm">{field.label}:</strong>
                        <span className="text-gray-700">{selectedItem[field.name] ?? <span className="text-gray-400">N/A</span>}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemDetail;
