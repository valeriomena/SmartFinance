import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const SalesProjectionCalculator = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [goodWeeks, setGoodWeeks] = useState(0);
  const [regularWeeks, setRegularWeeks] = useState(0);
  const [badWeeks, setBadWeeks] = useState(0);
  const [goodDays, setGoodDays] = useState(0);
  const [regularDays, setRegularDays] = useState(0);
  const [badDays, setBadDays] = useState(0);
  const [workedDays, setWorkedDays] = useState(0);
  const [growthRate, setGrowthRate] = useState(0);
  const [salesGood, setSalesGood] = useState(0); // Valor por día/semana bueno
  const [salesRegular, setSalesRegular] = useState(0); // Valor por día/semana regular
  const [salesBad, setSalesBad] = useState(0); // Valor por día/semana malo

  const [monthlyProjection, setMonthlyProjection] = useState(0);
  const [yearlyProjection, setYearlyProjection] = useState(0);

  const calculateProjection = () => {
    try {
      let monthly = 0;
      let yearly = 0;

      // Validaciones de cantidad de semanas
      if (isMonthly) {
        if (goodWeeks + regularWeeks + badWeeks > 4) {
          alert("La suma total de semanas no puede ser mayor a 4.");
          return;
        }
        if (badWeeks > regularWeeks || regularWeeks > goodWeeks) {
          alert("Las semanas malas no pueden superar las regulares y las regulares no pueden superar las buenas.");
          return;
        }
        monthly =
          goodWeeks * salesGood +
          regularWeeks * salesRegular +
          badWeeks * salesBad;
      } else {
        // Validaciones de cantidad de días
        if (goodDays + regularDays + badDays > workedDays || workedDays > 7) {
          alert("La cantidad de días no puede superar los días trabajados o 7 días.");
          return;
        }
        if (badDays > regularDays || regularDays > goodDays) {
          alert("Los días malos no pueden superar los regulares y los regulares no pueden superar los buenos.");
          return;
        }
        const weeklySales =
          goodDays * salesGood +
          regularDays * salesRegular +
          badDays * salesBad;
        monthly = weeklySales * 4;
        yearly = weeklySales * 52;
      }

      monthly = monthly * (1 + growthRate / 100);
      yearly = (yearly || monthly * 12) * (1 + growthRate / 100);

      setMonthlyProjection(monthly);
      setYearlyProjection(yearly);
    } catch (error) {
      console.error("Error calculando proyecciones:", error);
    }
  };

  const data = [
    { name: "Enero", sales: monthlyProjection },
    { name: "Febrero", sales: monthlyProjection * (1 + growthRate / 100) },
    { name: "Marzo", sales: monthlyProjection * Math.pow(1 + growthRate / 100, 2) },
    { name: "Abril", sales: monthlyProjection * Math.pow(1 + growthRate / 100, 3) },
    { name: "Mayo", sales: monthlyProjection * Math.pow(1 + growthRate / 100, 4) },
    { name: "Junio", sales: monthlyProjection * Math.pow(1 + growthRate / 100, 5) },
    { name: "Julio", sales: monthlyProjection * Math.pow(1 + growthRate / 100, 6) },
    { name: "Agosto", sales: monthlyProjection * Math.pow(1 + growthRate / 100, 7) },
    { name: "Septiembre", sales: monthlyProjection * Math.pow(1 + growthRate / 100, 8) },
    { name: "Octubre", sales: monthlyProjection * Math.pow(1 + growthRate / 100, 9) },
    { name: "Noviembre", sales: monthlyProjection * Math.pow(1 + growthRate / 100, 10) },
    { name: "Diciembre", sales: monthlyProjection * Math.pow(1 + growthRate / 100, 11) },
  ];

  return (
    <div className="flex justify-center gap-8 p-8">
      {/* Formulario */}
      <div className="flex-1 border p-6 bg-white rounded-lg shadow-md transform transition-all duration-500 hover:scale-105">
        <h3 className="text-xl font-semibold mb-4">Configuración de Proyección</h3>

        {/* Botón para cambiar entre mensual y semanal */}
        <div className="mb-4">
          <button
            onClick={() => setIsMonthly(true)}
            className={`mr-4 px-4 py-2 rounded-lg transition duration-300 transform hover:bg-blue-600 ${isMonthly ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Mensual
          </button>
          <button
            onClick={() => setIsMonthly(false)}
            className={`px-4 py-2 rounded-lg transition duration-300 transform hover:bg-blue-600 ${!isMonthly ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Semanal
          </button>
        </div>

        {/* Campos de proyección */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {isMonthly ? (
            <>
              <div>
                <label className="block text-gray-700">Semanas Buenas:</label>
                <input
                  type="number"
                  value={goodWeeks}
                  onChange={(e) => setGoodWeeks(Math.min(4, Math.max(0, Number(e.target.value))))}
                  className="w-full border p-2 mt-2 rounded transition-all duration-300"
                  min="0"
                  max="4"
                />
              </div>
              <div>
                <label className="block text-gray-700">Semanas Regulares:</label>
                <input
                  type="number"
                  value={regularWeeks}
                  onChange={(e) => setRegularWeeks(Math.min(4, Math.max(0, Number(e.target.value))))}
                  className="w-full border p-2 mt-2 rounded transition-all duration-300"
                  min="0"
                  max="4"
                />
              </div>
              <div>
                <label className="block text-gray-700">Semanas Malas:</label>
                <input
                  type="number"
                  value={badWeeks}
                  onChange={(e) => setBadWeeks(Math.min(4, Math.max(0, Number(e.target.value))))}
                  className="w-full border p-2 mt-2 rounded transition-all duration-300"
                  min="0"
                  max="4"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-700">Días Trabajados:</label>
                <input
                  type="number"
                  value={workedDays}
                  onChange={(e) => setWorkedDays(Math.min(7, Math.max(0, Number(e.target.value))))}
                  className="w-full border p-2 mt-2 rounded transition-all duration-300"
                  min="0"
                  max="7"
                />
              </div>
              <div>
                <label className="block text-gray-700">Días Buenos:</label>
                <input
                  type="number"
                  value={goodDays}
                  onChange={(e) => setGoodDays(Math.min(7, Math.max(0, Number(e.target.value))))}
                  className="w-full border p-2 mt-2 rounded transition-all duration-300"
                  min="0"
                  max="7"
                />
              </div>
              <div>
                <label className="block text-gray-700">Días Regulares:</label>
                <input
                  type="number"
                  value={regularDays}
                  onChange={(e) => setRegularDays(Math.min(7, Math.max(0, Number(e.target.value))))}
                  className="w-full border p-2 mt-2 rounded transition-all duration-300"
                  min="0"
                  max="7"
                />
              </div>
              <div>
                <label className="block text-gray-700">Días Malos:</label>
                <input
                  type="number"
                  value={badDays}
                  onChange={(e) => setBadDays(Math.min(7, Math.max(0, Number(e.target.value))))}
                  className="w-full border p-2 mt-2 rounded transition-all duration-300"
                  min="0"
                  max="7"
                />
              </div>
            </>
          )}
          <div className="col-span-2">
            <label className="block text-gray-700">Factor de Crecimiento (%):</label>
            <input
              type="number"
              value={growthRate}
              onChange={(e) => setGrowthRate(Math.max(0, Number(e.target.value)))}
              className="w-full border p-2 mt-2 rounded transition-all duration-300"
            />
          </div>
          <div className="col-span-2 mt-4">
            <button
              onClick={calculateProjection}
              className="w-full bg-blue-500 text-white py-2 rounded-lg transition duration-300 hover:bg-blue-600"
            >
              Calcular Proyección
            </button>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="flex-1 p-6 border bg-white rounded-lg shadow-md transform transition-all duration-500 hover:scale-105">
        <h3 className="text-xl font-semibold mb-4">Proyección de Ventas</h3>
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="sales"
            fill="url(#grad)"
            shape="roundRectangle"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#8884d8", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#82ca9d", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </BarChart>
      </div>
    </div>
  );
};

export default SalesProjectionCalculator;
