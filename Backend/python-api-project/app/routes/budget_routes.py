from flask import Blueprint
from app.controllers.budget_controller import current_budget

budget_routes = Blueprint('budget_routes', __name__)

budget_routes.route('/currentBudget/<int:user_id>', methods=['GET'])(current_budget)