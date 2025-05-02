import React, { useState, useEffect } from 'react';
import { fetchExpenses } from '../services/api';
import '../styles/pastExpenses.css';

const PastExpenses = ({user}) => {
    const userId = user?.user_id;
    const [filter, setFilter] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchExpenses(userId);
                const expenses = Array.isArray(response) ? response : [];
                setExpenses(expenses);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };
        fetchData();
    }
    , []);

    // Función para filtrar por fecha
    const filterExpenses = (expenses) => {
        const currentDate = new Date();
        let filteredExpenses = expenses;

        // Filtrar según el radio button seleccionado
        if (filter === 'week') {
            const lastWeek = new Date();
            lastWeek.setDate(currentDate.getDate() - 7);
            filteredExpenses = expenses.filter(expense => new Date(expense.date) >= lastWeek);
        } else if (filter === 'month') {
            const lastMonth = new Date();
            lastMonth.setMonth(currentDate.getMonth() - 1);
            filteredExpenses = expenses.filter(expense => new Date(expense.date) >= lastMonth);
        } else if (filter === '3months') {
            const last3Months = new Date();
            last3Months.setMonth(currentDate.getMonth() - 3);
            filteredExpenses = expenses.filter(expense => new Date(expense.date) >= last3Months);
        } else if (filter === 'year') {
            const lastYear = new Date();
            lastYear.setFullYear(currentDate.getFullYear() - 1);
            filteredExpenses = expenses.filter(expense => new Date(expense.date) >= lastYear);
        }

        // Filtrar por rango de fechas
        if (startDate && endDate) {
            filteredExpenses = filteredExpenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
            });
        }

        return filteredExpenses;
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);

        if (event.target.value !== 'all') {
            setStartDate('');
            setEndDate('');
        }
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const filteredExpenses = filterExpenses(expenses);

    return (
        <div className="past-expenses">
            <h3>Gastos Pasados</h3>

            <div className="filters">
                <label>
                    <input type="radio" value="week" checked={filter === 'week'} onChange={handleFilterChange} />
                    Última Semana
                </label>
                <label>
                    <input type="radio" value="month" checked={filter === 'month'} onChange={handleFilterChange} />
                    Último Mes
                </label>
                <label>
                    <input type="radio" value="3months" checked={filter === '3months'} onChange={handleFilterChange} />
                    Últimos 3 Meses
                </label>
                <label>
                    <input type="radio" value="year" checked={filter === 'year'} onChange={handleFilterChange} />
                    Último Año
                </label>
                <label>
                    <input type="radio" value="all" checked={filter === 'all'} onChange={handleFilterChange} />
                    Todos
                </label>

                <div className="date-range">
                    <label>
                        Desde:
                        <input type="date" value={startDate} onChange={handleStartDateChange} />
                    </label>
                    <label>
                        Hasta:
                        <input type="date" value={endDate} onChange={handleEndDateChange} />
                    </label>
                    <button onClick={() => { setStartDate(''); setEndDate(''); }}>Limpiar Fechas</button>
                </div>
            </div>

            <table className="expenses-table">
                <thead>
                    <tr>
                        <th>Tipo de Gasto</th>
                        <th>Gasto</th>
                        <th>Fecha de Emisión</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredExpenses.map((expense) => (
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

export default PastExpenses;
