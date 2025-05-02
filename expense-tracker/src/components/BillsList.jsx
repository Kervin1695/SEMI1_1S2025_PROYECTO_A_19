import React, { useState, useEffect } from 'react';
import { fetchBills } from '../services/api';
import '../styles/billsList.css';

const BillsList = ({user}) => {
    const userId = user?.user_id;
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchBills(userId);
                const expenses = Array.isArray(response) ? response : [];
                setBills(expenses);
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        };
        fetchData();
    }
    , []);

    const handleViewBill = (billId) => {
        alert(`Ver detalles de la factura con ID: ${billId}`);
    };

    return (
        <div className="bills-list">
            <h3>Lista de Facturas</h3>
            <table className="bills-table">
                <thead>
                    <tr>
                        <th>Tipo de Gasto</th>
                        <th>Monto</th>
                        <th>Fecha de Emisión</th>
                        <th>Descripción</th>
                        <th>Visualizar</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill) => (
                        <tr key={bill.id}>
                            <td>{bill.type}</td>
                            <td>Q{Number(bill.amount).toFixed(2)}</td>
                            <td>{bill.date}</td>
                            <td>{bill.description}</td>
                            <td>
                                <button
                                    className="view-button"
                                    onClick={() => handleViewBill(bill.id)}
                                >
                                    Ver
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BillsList;
