import React, { useState } from 'react';
import '../styles/currentBudget.css';

const CurrentBudget = () => {
  const [expenses] = useState([
    { id: 1, description: 'Compra supermercado', amount: 200, date: '2025-04-01' },
    { id: 2, description: 'Gasolina', amount: 50, date: '2025-04-05' },
    { id: 3, description: 'Pago Internet', amount: 30, date: '2025-04-10' },
  ]);

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="current-budget">
      <h3>Total de Gastos del Mes</h3>
      <h2>${totalExpenses.toFixed(2)}</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.description}</span> - ${expense.amount} - <span>{expense.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentBudget;
