from flask import Blueprint, request
from app.controllers.expenses_controller import add_expense, past_expenses

expenses_bp = Blueprint('expenses', __name__)

@expenses_bp.route('/addExpense/<int:user_id>', methods=['POST'])
def add_expense_route(user_id):
    return add_expense(user_id)

@expenses_bp.route('/pastExpenses/<int:user_id>', methods=['GET'])
def past_expenses_route(user_id):
    return past_expenses(user_id)