import React, { useState, useEffect } from 'react';
import { fetchBills } from '../services/api';
import '../styles/billsList.css';

const BillsList = (user) => {
    const [bills, setBills] = useState([
        { "id": 1, "type": "Supermercado", "date": "2025-01-05", "description": "Compra de alimentos", "amount": 350.75 },
        { "id": 2, "type": "Gasolina", "date": "2025-03-02", "description": "Llenado de tanque", "amount": 285.50 },
        { "id": 3, "type": "Internet", "date": "2025-04-01", "description": "Pago mensual del servicio", "amount": 200.00 },
        { "id": 4, "type": "Ropa", "date": "2025-04-10", "description": "Compra de ropa", "amount": 580.90 },
        { "id": 5, "type": "Educación", "date": "2025-04-15", "description": "Curso online", "amount": 150.00 }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchBills();
                setBills(response.data);
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
                            <td>Q{bill.amount.toFixed(2)}</td>
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
