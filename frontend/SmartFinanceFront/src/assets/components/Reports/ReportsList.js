import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ReportsList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get('/reports')
      .then(response => setReports(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Lista de Reportes</h2>
      <Link to="/reports/new">Crear Nuevo Reporte</Link>
      <ul>
        {reports.map(report => (
          <li key={report._id}>
            <Link to={`/reports/${report._id}`}>{report.periodo}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsList;
