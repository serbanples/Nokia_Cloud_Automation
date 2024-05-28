from flask import Blueprint, request, jsonify, session
from server.ssh_manager import SSHManager

ssh_bp = Blueprint('ssh', __name__)
ssh_manager = SSHManager()

@ssh_bp.route('/connect', methods=['POST'])
def connect_ssh():
    data = request.json
    hostname = data.get('hostname')
    username = data.get('username')
    password = data.get('password')
    
    success, message = ssh_manager.connect(hostname, username, password)
    
    session['connected'] = success
    return jsonify({'success': success, 'message': message})

@ssh_bp.route('/execute', methods=['POST'])
def execute_command():
    if 'connected' in session and session['connected']:
        data = request.json
        command = data.get('command')
        
        output, error = ssh_manager.execute_command(command)
        return jsonify({'output': output, 'error': error})
    else:
        return jsonify({'error': 'No SSH connection established.'}), 400

@ssh_bp.route('/close', methods=['POST'])
def close_ssh():
    success, message = ssh_manager.close_connection()
    session.pop('connected', None)
    return jsonify({'success': success, 'message': message})
