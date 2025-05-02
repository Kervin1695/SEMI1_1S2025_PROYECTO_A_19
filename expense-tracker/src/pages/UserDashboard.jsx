import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CurrentBudget from '../components/CurrentBudget';
import BillsList from '../components/BillsList';
import PastExpenses from '../components/PastExpenses';
import Reports from '../components/Reports';
import AddBill from '../components/AddBill';
import '../styles/userDashboard.css';

const UserDashboard = () => {
    const location = useLocation();
    const { user } = location.state || {};

    console.log(user); 

    const [currentTab, setCurrentTab] = useState('budget');
    const [showAddBill, setShowAddBill] = useState(false);
    const [expenses, setExpenses] = useState([
        { id: 1, description: 'Compra supermercado', amount: 200, date: '2025-04-01' },
        { id: 2, description: 'Gasolina', amount: 50, date: '2025-04-05' },
        { id: 3, description: 'Pago Internet', amount: 30, date: '2025-04-10' },
    ]);

    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

    const renderTabContent = () => {
        switch (currentTab) {
            case 'budget':
                return <CurrentBudget user={user} />
            case 'invoices':
                return <BillsList user={user} />;
            case 'pastExpenses':
                return <PastExpenses user={user} />;
            case 'reports':
                return <Reports user={user} />;
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <button onClick={() => setCurrentTab('budget')}>Presupuesto Actual</button>
                <button onClick={() => setCurrentTab('invoices')}>Lista de Facturas</button>
                <button onClick={() => setCurrentTab('pastExpenses')}>Gastos Pasados</button>
                <button onClick={() => setCurrentTab('reports')}>Reportes</button>
            </div>

            <div className="main-content">
                <nav className="navbar">
                    <a href="#" onClick={() => setCurrentTab('budget')}>Inicio</a>
                    <a href="#">Acerca de Nosotros</a>
                    <a href="#">El Equipo</a>
                    <a href="#">Manuales</a>
                    <label htmlFor="languages"> | Elige un idioma:</label>
                    <select id="languages" className='select-language' name="opcion_seleccionada">
                        <option value="language1">Español</option>
                        <option value="language2">Inglés</option>
                        <option value="language3">Francés</option>
                    </select>
                </nav>
                <div className="header">
                    <h2>Dashboard</h2>
                    <div className="actions">
                        <button className="action-button" onClick={() => setShowAddBill(true)}>Agregar Gasto</button>
                    </div>
                </div>
                <div className="content">
                    {renderTabContent()}
                </div>
            </div>
            {showAddBill && <AddBill onClose={() => setShowAddBill(false)} user={user} />}
        </div>
    );
};

export default UserDashboard;
