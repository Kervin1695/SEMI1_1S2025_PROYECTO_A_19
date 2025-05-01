const API_BASE_URL = 'http://localhost:5000';

export const fetchCurrentBudgetExpenses = async (user_id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/currentBudget/${user_id}`);
        if (!response.ok) {
            throw new Error('Error fetching current budget expenses');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching current budget expenses:', error);
        throw error;
    }
}

export const fetchBills = async (user_id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/bills/${user_id}`);
        if (!response.ok) {
            throw new Error('Error fetching bills');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching bills:', error);
        throw error;
    }
}

export const fetchExpenses = async (user_id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pastExpenses/${user_id}`);
        if (!response.ok) {
            throw new Error('Error fetching expenses');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
}

export const addExpense = async (user_id, expense) => {
    try {
        const response = await fetch(`${API_BASE_URL}/addExpense/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        });
        if (!response.ok) {
            throw new Error('Error adding expense');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
}

export const addBill = async (user_id, bill) => {
    try {
        const response = await fetch(`${API_BASE_URL}/addBill/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bill),
        });
        if (!response.ok) {
            throw new Error('Error adding bill');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding bill:', error);
        throw error;
    }
}

export const fetchExpensesReport = async (user_id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reports/expenses/${user_id}`);
        if (!response.ok) {
            throw new Error('Error fetching expenses report');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching expenses report:', error);
        throw error;
    }
}

export const fetchExpensesByTypeReport = async (user_id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reports/expensesByType/${user_id}`);
        if (!response.ok) {
            throw new Error('Error fetching expenses by type');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching expenses by type:', error);
        throw error;
    }
}


