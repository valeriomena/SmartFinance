import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    api.get(`/reports/${id}`)
      .then(response => setReport(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!report) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalles del Reporte</h2>
      <p><strong>Periodo:</strong> {report.periodo}</p>
      <p><strong>Ingresos:</strong> {report.ingresos}</p>
      <p><strong>Costos:</strong> {report.costos}</p>
      <p><strong>Gastos Operativos:</strong> {report.gastos_operativos}</p>
      <p><strong>Gastos Financieros:</strong> {report.gastos_financieros}</p>
      <p><strong>Beneficio Bruto:</strong> {report.beneficio_bruto}</p>
      <p><strong>Beneficio Neto:</strong> {report.beneficio_neto}</p>
      {/* Otros detalles */}
    </div>
  );
};

export default ReportDetail;
