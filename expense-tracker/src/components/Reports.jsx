import React, { useState, useEffect } from 'react';
import '../styles/reports.css';
import gastosImg from '../assets/reporte-gastos.png';
import facturasImg from '../assets/reporte-facturas.png';
import presupuestoImg from '../assets/reporte-presupuesto.png';
import { fetchExpensesReport, fetchExpensesByTypeReport } from '../services/api';

const Reports = () => {
    const [selectedReport, setSelectedReport] = useState('gastosAnuales');
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                let data;
                if (selectedReport === 'gastosAnuales') {
                    data = await fetchExpensesReport();
                } else if (selectedReport === 'gastosTipo') {
                    data = await fetchExpensesByTypeReport();
                } else {
                    data = null;
                }
                setReportData(data);
            } catch (error) {
                console.error('Error fetching report data:', error);
                setReportData([]);
            }

        };
        fetchReportData();
    }, [selectedReport]);

    const getReportImage = () => {
        switch (selectedReport) {
            case 'gastosAnuales':
                return gastosImg;
            case 'gastosTipo':
                return facturasImg;
            default:
                return gastosImg;
        }
    };

    const renderReportContent = () => {
        if (!reportData || reportData.length === 0) {
            return <p>No hay datos disponibles.</p>;
        }

        switch (selectedReport) {
            case 'gastosAnuales':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>Mes</th>
                                <th>Total Gastado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.mes}</td>
                                    <td>Q{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'gastosTipo':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo de Gasto</th>
                                <th>Monto Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.tipo}</td>
                                    <td>${item.monto}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            default:
                return null;
        }
    };

    return (
        <div className="reports-container">
            <h2>Reportes</h2>
            <div className="report-select">
                <label htmlFor="reportType">Selecciona un reporte:</label>
                <select
                    id="reportType"
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}
                >
                    <option value="gastosAnuales">Reporte de Gastos del Último Año</option>
                    <option value="gastosTipo">Reporte de Gastos por Tipo</option>
                </select>
            </div>
            <div className="report-description">
                <p>
                    Este es un reporte de {selectedReport === 'gastosAnuales' ? 'gastos del último año' : selectedReport === 'gastosTipo' ? 'gastos por Tipo' : 'presupuesto'}.
                    Aquí puedes ver un resumen de tus {selectedReport === 'gastos' ? 'gastos' : selectedReport === 'facturas' ? 'facturas' : 'presupuesto'}.
                </p>
            </div>
            <div className="report-image">
                <img src={getReportImage()} alt="Reporte visual" />
            </div>
            <div className='report-table'>
                {renderReportContent()}
            </div>
        </div>
    );
};

export default Reports;
