import React, { useState } from 'react';
import '../styles/billsList.css';

const BillsList = () => {
  const [bills] = useState([
    { id: 1, type: 'Supermercado', date: '2025-04-01', description: 'Compra de alimentos', },
    { id: 2, type: 'Gasolina', date: '2025-04-03', description: 'Llenado de tanque', },
    { id: 3, type: 'Internet', date: '2025-04-05', description: 'Pago mensual del servicio', },
  ]);

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
            <th>Fecha de Emisión</th>
            <th>Descripción</th>
            <th>Visualizar</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.type}</td>
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
