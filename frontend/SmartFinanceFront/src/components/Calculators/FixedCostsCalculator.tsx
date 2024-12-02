import React, { useState } from 'react';
import { CostCategory } from './CostCategory';
import { DollarSign, PieChart } from 'lucide-react';

interface CostItem {
  name: string;
  amount: number;
}

interface CostCategories {
  facilities: CostItem[];
  utilities: CostItem[];
  salaries: CostItem[];
  insurance: CostItem[];
  other: CostItem[];
}

export function FixedCostsCalculator() {
  const [costs, setCosts] = useState<CostCategories>({
    facilities: [],
    utilities: [],
    salaries: [],
    insurance: [],
    other: [],
  });

  const handleAddItem = (category: keyof CostCategories) => {
    setCosts(prev => ({
      ...prev,
      [category]: [...prev[category], { name: '', amount: 0 }]
    }));
  };

  const handleRemoveItem = (category: keyof CostCategories, index: number) => {
    setCosts(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const handleUpdateItem = (
    category: keyof CostCategories,
    index: number,
    field: keyof CostItem,
    value: string
  ) => {
    setCosts(prev => ({
      ...prev,
      [category]: prev[category].map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [field]: field === 'amount' ? parseFloat(value) || 0 : value
          };
        }
        return item;
      })
    }));
  };

  const calculateTotalByCategory = (category: CostItem[]): number => {
    return category.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  const calculateGrandTotal = (): number => {
    return Object.values(costs).reduce(
      (total, category) => total + calculateTotalByCategory(category),
      0
    );
  };

  const calculatePercentage = (amount: number): number => {
    const total = calculateGrandTotal();
    return total ? (amount / total) * 100 : 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="flex items-center justify-center gap-3 mb-8">
        <DollarSign className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Monthly Fixed Costs Calculator</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <CostCategory
            title="Facilities & Rent"
            items={costs.facilities}
            onAddItem={() => handleAddItem('facilities')}
            onRemoveItem={(index) => handleRemoveItem('facilities', index)}
            onUpdateItem={(index, field, value) => 
              handleUpdateItem('facilities', index, field, value)
            }
          />
          
          <CostCategory
            title="Utilities"
            items={costs.utilities}
            onAddItem={() => handleAddItem('utilities')}
            onRemoveItem={(index) => handleRemoveItem('utilities', index)}
            onUpdateItem={(index, field, value) => 
              handleUpdateItem('utilities', index, field, value)
            }
          />
          
          <CostCategory
            title="Salaries & Wages"
            items={costs.salaries}
            onAddItem={() => handleAddItem('salaries')}
            onRemoveItem={(index) => handleRemoveItem('salaries', index)}
            onUpdateItem={(index, field, value) => 
              handleUpdateItem('salaries', index, field, value)
            }
          />
          
          <CostCategory
            title="Insurance & Benefits"
            items={costs.insurance}
            onAddItem={() => handleAddItem('insurance')}
            onRemoveItem={(index) => handleRemoveItem('insurance', index)}
            onUpdateItem={(index, field, value) => 
              handleUpdateItem('insurance', index, field, value)
            }
          />
          
          <CostCategory
            title="Other Fixed Costs"
            items={costs.other}
            onAddItem={() => handleAddItem('other')}
            onRemoveItem={(index) => handleRemoveItem('other', index)}
            onUpdateItem={(index, field, value) => 
              handleUpdateItem('other', index, field, value)
            }
          />
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-800">Cost Breakdown</h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(costs).map(([category, items]) => {
                const total = calculateTotalByCategory(items);
                const percentage = calculatePercentage(total);
                if (total === 0) return null;
                
                return (
                  <div key={category} className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">
                  Total Monthly Fixed Costs
                </span>
                <span className="text-2xl font-bold text-indigo-600">
                  ${calculateGrandTotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="text-sm font-medium text-blue-800 mb-3">Tips for Managing Fixed Costs</h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Review and negotiate contracts regularly</li>
              <li>• Consider energy-efficient alternatives for utilities</li>
              <li>• Evaluate space utilization for facility costs</li>
              <li>• Compare insurance providers annually</li>
              <li>• Look for bulk purchase opportunities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}