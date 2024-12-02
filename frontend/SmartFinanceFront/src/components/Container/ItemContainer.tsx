import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import ItemForm from './ItemForm';
import { useEndpoint } from '../../contexts/EndpointContext';

interface Field {
    name: string;
    label: string;
    type: 'text' | 'number' | 'date';
    required: boolean;
    validationMessage: string;
}

interface ItemContainerProps {
    endpoint: string;
    itemName: string;
    fields: Field[];
}

const ItemContainer: React.FC<ItemContainerProps> = ({ endpoint, itemName, fields }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [businessName, setBusinessName] = useState<string | null>(null);

    const { selectedBusinessId, setSelectedBusinessId } = useEndpoint();

    useEffect(() => {
        if (selectedBusinessId) {
            setSelectedItem(selectedBusinessId);
        }
    }, [selectedBusinessId]);

    const handleItemSelect = (itemId: string, businessName: string) => {
        setSelectedItem(itemId);
        setBusinessName(businessName);
        setSelectedBusinessId(itemId);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-[auto,1fr] gap-6 p-6 max-w-screen-xl mx-auto bg-gray-900 rounded-lg shadow-lg box-border">
            {/* Formulario de ítem */}
            <div className="form-container bg-gray-800 p-6 shadow-md rounded-lg">
                <ItemForm
                    endpoint={endpoint}
                    itemName={itemName}
                    fields={fields}
                    onRefresh={() => setSelectedItem(null)}
                    selectedItem={selectedItem}
                />
            </div>

            {/* Lista de ítems */}
            <div className="list-container bg-gray-800 p-6 shadow-md rounded-lg overflow-auto">
                <ItemList
                    endpoint={endpoint}
                    itemName={itemName}
                    onSelectItem={handleItemSelect}
                />
            </div>

            {/* Detalle del ítem seleccionado */}
            <div className="detail-container p-6 bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-white">Detalles</h3>
                <div className="text-sm text-gray-300">
                    <p><strong>Negocio:</strong> {businessName || 'No seleccionado'}</p>
                    <p><strong>ID:</strong> {selectedItem || 'No seleccionado'}</p>
                </div>
            </div>
        </div>
    );
};

export default ItemContainer;
