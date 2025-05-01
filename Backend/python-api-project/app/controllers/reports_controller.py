from flask import Blueprint, jsonify, request
from app.models.expense_model import Expense
from app.models.user_model import User

reports_bp = Blueprint('reports', __name__)

@reports_bp.route('/reports/expenses/<int:user_id>', methods=['GET'])
def get_expenses_report(user_id):
    expenses = Expense.query.filter_by(user_id=user_id).all()
    total_amount = sum(expense.amount for expense in expenses)
    return jsonify({'user_id': user_id, 'total_expenses': total_amount, 'expenses': [expense.to_dict() for expense in expenses]})

@reports_bp.route('/reports/expensesByType/<int:user_id>', methods=['GET'])
def get_expenses_by_type_report(user_id):
    expenses = Expense.query.filter_by(user_id=user_id).all()
    expenses_by_type = {}
    for expense in expenses:
        if expense.type not in expenses_by_type:
            expenses_by_type[expense.type] = 0
        expenses_by_type[expense.type] += expense.amount
    return jsonify({'user_id': user_id, 'expenses_by_type': expenses_by_type})