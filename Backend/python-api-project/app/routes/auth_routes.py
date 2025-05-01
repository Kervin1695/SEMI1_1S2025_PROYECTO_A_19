from flask import Blueprint, request
from app.controllers.auth_controller import register_user, login_user

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/register', methods=['POST'])
def register():
    return register_user(request.json)

@auth_routes.route('/login', methods=['POST'])
def login():
    return login_user(request.json)