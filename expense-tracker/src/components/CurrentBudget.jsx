import React, { useState, useEffect } from 'react';
import { fetchCurrentBudgetExpenses } from '../services/api';
import '../styles/currentBudget.css';

const CurrentBudget = (user) => {
    const [currentExpenses, setCurrentExpenses] = useState([
        { "id": 1, "type": "Supermercado", "date": "2025-01-05", "description": "Compra de alimentos", "amount": 350.75 },
        { "id": 2, "type": "Gasolina", "date": "2025-03-02", "description": "Llenado de tanque", "amount": 285.50 },
        { "id": 3, "type": "Internet", "date": "2025-04-01", "description": "Pago mensual del servicio", "amount": 200.00 },
        { "id": 4, "type": "Ropa", "date": "2025-04-10", "description": "Compra de ropa", "amount": 580.90 },
        { "id": 5, "type": "Educación", "date": "2025-04-15", "description": "Curso online", "amount": 150.00 }
    ]);

    const totalExpenses = currentExpenses.reduce((total, expense) => total + expense.amount, 0);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetchCurrentBudgetExpenses(user["id"]);
                setCurrentExpenses(response.data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }
    , []);

    return (
        <div className="current-budget">
            <h3>Total de Gastos del Mes</h3>
            <h2>Q{totalExpenses.toFixed(2)}</h2>
            <table className="expenses-table">
                <thead>
                    <tr>
                        <th>Tipo de Gasto</th>
                        <th>Monto</th>
                        <th>Fecha de Emisión</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {currentExpenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.type}</td>
                            <td>Q{expense.amount.toFixed(2)}</td>
                            <td>{expense.date}</td>
                            <td>{expense.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CurrentBudget;
//