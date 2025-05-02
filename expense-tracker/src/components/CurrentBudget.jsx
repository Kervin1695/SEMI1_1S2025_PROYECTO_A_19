import React, { useState, useEffect } from 'react';
import { fetchCurrentBudgetExpenses } from '../services/api';
import '../styles/currentBudget.css';

const CurrentBudget = ({ user }) => {
    const userId = user?.user_id;

    const [currentExpenses, setCurrentExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetchCurrentBudgetExpenses(userId);
                const expenses = Array.isArray(response) ? response : [];
                console.log(expenses);
                setCurrentExpenses(expenses);
            } catch (error) {
                console.error('Error fetching expenses:', error);
                setCurrentExpenses([]);
            }
        };

        if (userId) {
            fetchExpenses();
        }
    }, [userId]);

    const totalExpenses = currentExpenses.reduce(
        (total, expense) => total + Number(expense.amount || 0),
        0
    ); 


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
                            <td>Q{Number(expense.amount).toFixed(2)}</td>
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