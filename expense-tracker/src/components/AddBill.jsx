import React, { useState, useEffect } from 'react';
import { addBill, addExpense } from '../services/api';
import '../styles/addBill.css';

const AddBill = ({ onClose }) => {
    const [hasInvoice, setHasInvoice] = useState(false);
    const [formData, setFormData] = useState({
        type: '',
        description: '',
        date: '',
        amount: '',
        invoiceFile: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleCheckboxChange = (e) => {
        setHasInvoice(e.target.checked);
        if (!e.target.checked) {
            setFormData({ ...formData, invoiceFile: null });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (hasInvoice && !formData.invoiceFile) {
            alert('Por favor, suba la factura.');
            return;
        }

        if (hasInvoice) {
            console.log('Subiendo archivo:', formData.invoiceFile);
        } else {
            let dataWithoutInvoice = {
                type: formData.type,
                description: formData.description,
                date: formData.date,
                amount: formData.amount
            };

            addExpense(dataWithoutInvoice)
                .then(response => {
                    console.log('Gasto agregado sin factura:', response.data);
                })
                .catch(error => {
                    console.error('Error al agregar gasto sin factura:', error);
                });
        }


        console.log(formData);
        onClose();
    };

    return (
        <div className="add-bill-modal">
            <div className="add-bill-container">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Agregar Gasto</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        ¿Tiene factura?
                        <input type="checkbox" checked={hasInvoice} onChange={handleCheckboxChange} />
                    </label>

                    <label>Tipo de Gasto:
                        <select name="type" value={formData.type} onChange={handleChange} required>
                            <option value="">Seleccione</option>
                            <option value="Alimentación">Alimentación</option>
                            <option value="Transporte">Transporte</option>
                            <option value="Servicios">Servicios</option>
                            <option value="Entretenimiento">Entretenimiento</option>
                            <option value="Educación">Educación</option>
                        </select>
                    </label>

                    <label>Descripción:
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </label>

                    <label>Fecha:
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </label>

                    <label>Monto:
                        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
                    </label>

                    {hasInvoice && (
                        <label>Subir Factura:
                            <input type="file" name="invoiceFile" accept="image/*" onChange={handleChange} />
                        </label>
                    )}

                    <div className="button-group">
                        <button type="submit" className="confirm-button">Confirmar</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBill;
