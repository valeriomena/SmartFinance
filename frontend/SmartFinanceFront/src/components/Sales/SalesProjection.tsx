import React, { useState } from 'react';
import '../../styles/Form.css'; // Importa los estilos del formulario

const weeksInMonth = 4;
const daysInWeek = 7;

const SalesProjection: React.FC = () => {
  const [calculationType, setCalculationType] = useState<'weekly' | 'daily'>('weekly');
  const [goodSales, setGoodSales] = useState<number>(0);
  const [regularSales, setRegularSales] = useState<number>(0);
  const [badSales, setBadSales] = useState<number>(0);
  const [goodPeriods, setGoodPeriods] = useState<number>(0);
  const [regularPeriods, setRegularPeriods] = useState<number>(0);
  const [badPeriods, setBadPeriods] = useState<number>(0);
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState<number>(5);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [averageSales, setAverageSales] = useState<string | null>(null);

  const validateInputs = () => {
    if (calculationType === 'weekly') {
      if (goodPeriods + regularPeriods + badPeriods !== weeksInMonth) {
        setErrorMessage(`La suma de semanas buenas, regulares y malas debe ser igual a ${weeksInMonth}.`);
        return false;
      }
    } else {
      if (workDaysPerWeek > daysInWeek) {
        setErrorMessage(`La cantidad de días de trabajo a la semana no puede superar ${daysInWeek}.`);
        return false;
      }
      if (goodPeriods + regularPeriods + badPeriods !== workDaysPerWeek) {
        setErrorMessage(`La suma de días buenos, regulares y malos debe ser igual a ${workDaysPerWeek}.`);
        return false;
      }
    }
    setErrorMessage(null);
    return true;
  };

  const calculateAverageSales = () => {
    if (!validateInputs()) {
      setAverageSales(null);
      return;
    }

    let totalPeriods = calculationType === 'weekly' ? weeksInMonth : workDaysPerWeek * weeksInMonth;
    let totalSales = (goodSales * goodPeriods + regularSales * regularPeriods + badSales * badPeriods) * (calculationType === 'weekly' ? 1 : weeksInMonth);
    let averageSales = calculationType === 'weekly' ? totalSales / totalPeriods : (totalSales / totalPeriods) * weeksInMonth;
    setAverageSales(averageSales.toFixed(2));
  };

  return (
    <div className="form-container">
      <h2>Sales Projection</h2>
      <form>
        <div className="input-group">
          <label>Calculation Type</label>
          <select value={calculationType} onChange={(e) => setCalculationType(e.target.value as 'weekly' | 'daily')}>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </select>
        </div>

        <div className="input-group">
          <label>Good Sales Amount</label>
          <input type="number" value={goodSales} onChange={(e) => setGoodSales(Number(e.target.value))} required />
        </div>
        <div className="input-group">
          <label>Regular Sales Amount</label>
          <input type="number" value={regularSales} onChange={(e) => setRegularSales(Number(e.target.value))} required />
        </div>
        <div className="input-group">
          <label>Bad Sales Amount</label>
          <input type="number" value={badSales} onChange={(e) => setBadSales(Number(e.target.value))} required />
        </div>

        {calculationType === 'daily' && (
          <div className="input-group">
            <label>Work Days per Week</label>
            <input type="number" value={workDaysPerWeek} onChange={(e) => setWorkDaysPerWeek(Number(e.target.value))} required />
          </div>
        )}

        <div className="input-group">
          <label>Good {calculationType === 'weekly' ? 'Weeks' : 'Days'}</label>
          <input type="number" value={goodPeriods} onChange={(e) => setGoodPeriods(Number(e.target.value))} required />
        </div>
        <div className="input-group">
          <label>Regular {calculationType === 'weekly' ? 'Weeks' : 'Days'}</label>
          <input type="number" value={regularPeriods} onChange={(e) => setRegularPeriods(Number(e.target.value))} required />
        </div>
        <div className="input-group">
          <label>Bad {calculationType === 'weekly' ? 'Weeks' : 'Days'}</label>
          <input type="number" value={badPeriods} onChange={(e) => setBadPeriods(Number(e.target.value))} required />
        </div>

        <button type="button" onClick={calculateAverageSales}>Calculate Average Sales</button>
      </form>

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      {averageSales && (
        <div className="result">
          <p>Ventas mensuales proyectadas es de: ${averageSales}</p>
        </div>
      )}
    </div>
  );
};

export default SalesProjection;
