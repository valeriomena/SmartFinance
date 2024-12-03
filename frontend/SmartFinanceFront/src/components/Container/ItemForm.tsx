import React, { useEffect } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import useItemForm from '../../hooks/useItemForm';
import '../../styles/Form.css';

interface Field {
    name: string;
    label: string;
    type: 'text' | 'number' | 'date';
    required: boolean;
    validationMessage: string;
}

interface ItemData {
    name: string;
    description?: string;
}

interface ItemFormProps {
    endpoint: string;
    itemName: string;
    fields: Field[];
    onRefresh: () => void;
    selectedItem?: string | null;
}

const ItemForm: React.FC<ItemFormProps> = ({ endpoint, itemName, fields, onRefresh, selectedItem }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ItemData>();
    const { onSubmit, successMessage, formError } = useItemForm({
        endpoint,
        fields,
        onRefresh,
        itemName,
    });

    useEffect(() => {
        if (selectedItem) {
            setValue('name', selectedItem);
        }
    }, [selectedItem, setValue]);

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{itemName}</h2>
            <form onSubmit={handleSubmit(onSubmit as (data: ItemData) => void)} className="space-y-4">
                {fields.map((field) => (
                    <div key={field.name} className="flex flex-col">
                        <label htmlFor={field.name} className="text-sm font-medium mb-2">{field.label}:</label>
                        <input
                            id={field.name}
                            type={field.type}
                            {...register(field.name as keyof ItemData, { required: field.required ? field.validationMessage : false })}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors[field.name as keyof ItemData] && (
                            <p className="text-red-500 text-sm mt-1">
                                {(errors[field.name as keyof ItemData] as FieldError)?.message || ''}
                            </p>
                        )}
                    </div>
                ))}
                <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    {selectedItem ? 'Actualizar' : 'Crear'}
                </button>
            </form>
            {formError && <p className="mt-4 text-red-500">{formError}</p>}
            {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
        </div>
    );
};

export default ItemForm;
