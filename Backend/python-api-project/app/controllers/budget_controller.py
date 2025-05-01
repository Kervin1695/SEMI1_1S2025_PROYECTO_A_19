from flask import Blueprint, jsonify, request
from app.models.expense_model import Expense
from app.utils.db import db

budget_bp = Blueprint('budget', __name__)

@budget_bp.route('/currentBudget/<int:user_id>', methods=['GET'])
def current_budget(user_id):
    # Logic to calculate the current budget for the user
    # This is a placeholder implementation
    total_expenses = db.session.query(Expense).filter_by(user_id=user_id).with_entities(db.func.sum(Expense.amount)).scalar() or 0
    budget = 1000  # Example fixed budget
    remaining_budget = budget - total_expenses
    return jsonify({'user_id': user_id, 'remaining_budget': remaining_budget})