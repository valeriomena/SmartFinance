import React from 'react';
import { Trash2 } from 'lucide-react';

interface CostItemProps {
  name: string;
  amount: number;
}

interface CostCategoryProps {
  title: string;
  items: CostItemProps[];
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onUpdateItem: (index: number, field: keyof CostItemProps, value: string) => void;
}

export function CostCategory({ 
  title, 
  items, 
  onAddItem, 
  onRemoveItem, 
  onUpdateItem 
}: CostCategoryProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button
          onClick={onAddItem}
          className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
        >
          + Add Item
        </button>
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              value={item.name}
              onChange={(e) => onUpdateItem(index, 'name', e.target.value)}
              placeholder="Cost name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500">$</span>
              <input
                type="number"
                value={item.amount || ''}
                onChange={(e) => onUpdateItem(index, 'amount', e.target.value)}
                placeholder="0.00"
                className="w-32 pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              onClick={() => onRemoveItem(index)}
              className="p-2 text-gray-400 hover:text-red-500 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        {items.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No items added yet. Click "Add Item" to start.
          </p>
        )}
      </div>
    </div>
  );
}