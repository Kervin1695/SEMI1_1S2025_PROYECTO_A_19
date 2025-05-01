from flask import Blueprint, request, jsonify
from app.models.user_model import User
from app.utils.db import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    new_user = User(
        name=data['name'],
        lastname=data['lastname'],
        username=data['username'],
        email=data['email'],
        phone=data['phone'],
        password=data['password']  # Ensure to hash the password in a real application
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == data['password']:  # Ensure to verify the hashed password
        return jsonify({"message": "Login successful", "user_id": user.id}), 200
    return jsonify({"message": "Invalid credentials"}), 401