from flask import Blueprint, jsonify, request
from app.controllers.reports_controller import get_expenses_report, get_expenses_by_type_report

reports_bp = Blueprint('reports', __name__)

@reports_bp.route('/reports/expenses/<int:user_id>', methods=['GET'])
def expenses_report(user_id):
    report = get_expenses_report(user_id)
    return jsonify(report), 200

@reports_bp.route('/reports/expensesByType/<int:user_id>', methods=['GET'])
def expenses_by_type_report(user_id):
    report = get_expenses_by_type_report(user_id)
    return jsonify(report), 200