from flask import Blueprint, request, jsonify
from app.controllers.bills_controller import add_bill, get_bills_list

bills_bp = Blueprint('bills', __name__)

@bills_bp.route('/addBill/<int:user_id>', methods=['POST'])
def add_bill_route(user_id):
    data = request.get_json()
    result = add_bill(user_id, data)
    return jsonify(result), 201

@bills_bp.route('/billsList/<int:user_id>', methods=['GET'])
def bills_list_route(user_id):
    result = get_bills_list(user_id)
    return jsonify(result), 200