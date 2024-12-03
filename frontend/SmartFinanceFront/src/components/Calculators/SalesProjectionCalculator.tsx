import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

type CalculationType = 'weekly' | 'monthly';
type ConversionType = '4' | '4.33';

type SalesInput = {
    good: number;
    regular: number;
    bad: number;
    count: number;
    goodCount: number;
    regularCount: number;
    badCount: number;
};

export function SalesProjectionCalculator() {
    const [calcType, setCalcType] = useState<CalculationType>('weekly');
    const [conversionType, setConversionType] = useState<ConversionType>('4.33');
    const [salesData, setSalesData] = useState<SalesInput>({
        good: 0,
        regular: 0,
        bad: 0,
        count: 0,
        goodCount: 0,
        regularCount: 0,
        badCount: 0,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        validateInputs();
    }, [salesData, calcType]);

    const validateInputs = () => {
        const newErrors: Record<string, string> = {};

        if (salesData.regular > salesData.good) {
            newErrors.regular = 'Regular sales cannot exceed good sales';
        }
        if (salesData.bad > salesData.regular) {
            newErrors.bad = 'Bad sales cannot exceed regular sales';
        }

        if (calcType === 'weekly' && salesData.count > 7) {
            newErrors.count = 'Working days cannot exceed 7 days per week';
        } else if (calcType === 'monthly' && salesData.count > 4) {
            newErrors.count = 'Cannot exceed 4 weeks per month';
        }

        const totalCounts = salesData.goodCount + salesData.regularCount + salesData.badCount;
        if (totalCounts > salesData.count) {
            newErrors.counts = `Total ${calcType === 'weekly' ? 'days' : 'weeks'} cannot exceed ${salesData.count}`;
        }

        setErrors(newErrors);
    };

    const calculateMonthlyProjection = (): number => {
        if (Object.keys(errors).length > 0) return 0;

        const weeklyTotal =
            (salesData.good * salesData.goodCount) +
            (salesData.regular * salesData.regularCount) +
            (salesData.bad * salesData.badCount);

        return weeklyTotal * parseFloat(conversionType);
    };

    const handleInputChange = (field: keyof SalesInput, value: string) => {
        setSalesData(prev => ({
            ...prev,
            [field]: parseFloat(value) || 0
        }));
    };

    const handleTypeChange = (type: CalculationType) => {
        setCalcType(type);
        setSalesData(prev => ({
            ...prev,
            count: 0,
            goodCount: 0,
            regularCount: 0,
            badCount: 0
        }));
    };

    const renderInputGroup = (
        label: string,
        valueField: 'good' | 'regular' | 'bad',
        countField: 'goodCount' | 'regularCount' | 'badCount'
    ) => (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label} Sales ($)
                </label>
                <input
                    type="number"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors[valueField] ? 'border-red-500' : 'border-gray-300'
                        }`}
                    value={salesData[valueField] || ''}
                    onChange={(e) => handleInputChange(valueField, e.target.value)}
                    placeholder="Enter amount"
                />
                {errors[valueField] && (
                    <p className="mt-1 text-sm text-red-500">{errors[valueField]}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of {calcType === 'weekly' ? 'Days' : 'Weeks'}
                </label>
                <input
                    type="number"
                    min="0"
                    max={salesData.count}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.counts ? 'border-red-500' : 'border-gray-300'
                        }`}
                    value={salesData[countField] || ''}
                    onChange={(e) => handleInputChange(countField, e.target.value)}
                    placeholder={`Enter ${calcType === 'weekly' ? 'days' : 'weeks'}`}
                />
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto mt-8">
            <div className="flex flex-col items-center gap-4 mb-8">
                <div className="inline-flex rounded-lg border border-gray-200 p-1">
                    <button
                        onClick={() => handleTypeChange('weekly')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${calcType === 'weekly'
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Weekly Analysis
                    </button>
                    <button
                        onClick={() => handleTypeChange('monthly')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${calcType === 'monthly'
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Weekly to Monthly
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">
                        Weeks per Month:
                    </label>
                    <select
                        value={conversionType}
                        onChange={(e) => setConversionType(e.target.value as ConversionType)}
                        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="4">4 weeks (simplified)</option>
                        <option value="4.33">4.33 weeks (average)</option>
                    </select>
                    <div className="group relative">
                        <Info className="w-4 h-4 text-gray-400 cursor-help" />
                        <div className="hidden group-hover:block absolute left-6 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                            4.33 weeks is the average (52 weeks ÷ 12 months),
                            while 4 weeks is a simplified calculation
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Total {calcType === 'weekly' ? 'Working Days per Week' : 'Weeks per Month'}
                        </label>
                        <input
                            type="number"
                            min="1"
                            max={calcType === 'weekly' ? 7 : 4}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.count ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={salesData.count || ''}
                            onChange={(e) => handleInputChange('count', e.target.value)}
                            placeholder={`Enter number of ${calcType === 'weekly' ? 'working days' : 'weeks'}`}
                        />
                        {errors.count && (
                            <p className="mt-1 text-sm text-red-500">{errors.count}</p>
                        )}
                    </div>

                    {renderInputGroup(
                        'Good Day',
                        'good',
                        'goodCount'
                    )}
                    {renderInputGroup(
                        'Regular Day',
                        'regular',
                        'regularCount'
                    )}
                    {renderInputGroup(
                        'Bad Day',
                        'bad',
                        'badCount'
                    )}

                    {errors.counts && (
                        <p className="text-sm text-red-500 mt-2">{errors.counts}</p>
                    )}
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Projection</h3>
                    <div className="space-y-4">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">Projected Monthly Sales</p>
                            <p className="text-3xl font-bold text-indigo-600">
                                {calculateMonthlyProjection()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
