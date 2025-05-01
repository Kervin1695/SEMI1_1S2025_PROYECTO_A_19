from flask import Blueprint, request, jsonify
from app.models.bill_model import Bill
from app.utils.db import db

bills_bp = Blueprint('bills', __name__)

@bills_bp.route('/addBill/<int:user_id>', methods=['POST'])
def add_bill(user_id):
    data = request.get_json()
    new_bill = Bill(user_id=user_id, **data)
    db.session.add(new_bill)
    db.session.commit()
    return jsonify({'message': 'Bill added successfully'}), 201

@bills_bp.route('/billsList/<int:user_id>', methods=['GET'])
def bills_list(user_id):
    bills = Bill.query.filter_by(user_id=user_id).all()
    return jsonify([bill.to_dict() for bill in bills]), 200