from flask import Flask, request, jsonify
from features.excel_reader import read_xlsx, find_entries_by_name
from features.ssh_script import test_ssh_connection

import os

app = Flask(__name__)

@app.route('/data/<string:name>', methods=['GET'])
def get_data(name):
    excel_file = os.path.join("files", "task3.xlsx")
    print(f"Requesting data from file: task3.xlsx for user: {name}")

    xlsx_data = read_xlsx(excel_file)
    entries = find_entries_by_name(xlsx_data, name)

    return jsonify(entries)

@app.route('/connect', methods=['POST'])
def connect_ssh():
    data = request.json
    username = data.get('name')
    VM1 = data.get('VM1')

    success, message = test_ssh_connection(VM1, username)

    return jsonify({ 'success': success, 'message': message })

if __name__ == '__main__':
    app.run(debug=True)
