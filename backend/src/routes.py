from flask import Blueprint, request, jsonify
from app import app, db, bcrypt
from .forms import RegistrationForm, LoginForm
from .models import User
from flask_login import login_user, current_user, logout_user, login_required

import os

from features.excel_reader import read_xlsx, find_entries_by_name
from features.ssh_script import test_ssh_connection

routes = Blueprint('routes', __name__)

@app.route("/register", methods=['POST'])
def register():
    if current_user.is_authenticated:
        return jsonify({"message": "User already authenticated"}), 400
    
    data = request.get_json()
    form = RegistrationForm(data=data)
    if form.validate():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        is_admin = data.get('isAdmin', False)  # Default to False if not provided
        user = User(username=form.username.data, email=form.email.data, password=hashed_password, isAdmin=is_admin)
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    
    errors = form.errors
    return jsonify(errors), 400

@app.route("/login", methods=['POST'])
def login():
    if current_user.is_authenticated:
        return jsonify({"message": "User already authenticated"}), 400

    data = request.get_json()
    form = LoginForm(data=data)
    if form.validate():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"message": "Login unsuccessful. Check email and password"}), 401
    
    errors = form.errors
    return jsonify(errors), 400

@app.route("/logout", methods=['POST'])
def logout():
    logout_user()
    return jsonify({"message": "Logout successful"}), 200

@app.route("/user", methods=['GET'])
@login_required
def get_user():
    user_data = {
        "username": current_user.username,
        "email": current_user.email,
        "isAdmin": current_user.isAdmin
    }
    return jsonify(user_data), 200

@app.route("/check_auth", methods=['GET'])
def check_auth():
    if current_user.is_authenticated:
        user_data = {
            "username": current_user.username,
            "email": current_user.email,
            "isAdmin": current_user.isAdmin
        }
        return jsonify(user_data), 200
    return jsonify({"message": "User not authenticated"}), 401

@app.route('/data', methods=['GET'])
# @login_required
def get_data():
    excel_file = os.path.join("files", "task3.xlsx")
    print(f"Requesting data from file: task3.xlsx for user:")

    xlsx_data = read_xlsx(excel_file)

    return jsonify(xlsx_data)

@app.route('/connect', methods=['POST'])
@login_required
def connect_ssh():
    if not current_user.isAdmin:
        return jsonify({"message": "Access forbidden: admin only"}), 403
    data = request.json
    username = data.get('name')
    VM1 = data.get('VM1')

    success, message = test_ssh_connection(VM1, username)

    return jsonify({'success': success, 'message': message})
