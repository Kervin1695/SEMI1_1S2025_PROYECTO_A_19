from flask import Blueprint, request, jsonify
from app.models.expense_model import Expense
from app.utils.db import db

expenses_bp = Blueprint('expenses', __name__)

@expenses_bp.route('/addExpense/<int:user_id>', methods=['POST'])
def add_expense(user_id):
    data = request.get_json()
    new_expense = Expense(
        user_id=user_id,
        type=data.get('type'),
        description=data.get('description'),
        amount=data.get('amount'),
        date=data.get('date'),
        bill=data.get('bill')
    )
    db.session.add(new_expense)
    db.session.commit()
    return jsonify({'message': 'Expense added successfully'}), 201

@expenses_bp.route('/pastExpenses/<int:user_id>', methods=['GET'])
def past_expenses(user_id):
    expenses = Expense.query.filter_by(user_id=user_id).all()
    return jsonify([expense.to_dict() for expense in expenses]), 200