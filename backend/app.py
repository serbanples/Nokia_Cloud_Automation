from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_cors import CORS
from flask_migrate import Migrate
from src.config import Config

app = Flask(__name__)
app.config.from_object(Config)
app.config['WTF_CSRF_ENABLED'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)  # Initialize Flask-Migrate
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

CORS(app)

# Import routes after initializing app and extensions to avoid circular imports
from src.routes import routes
app.register_blueprint(routes)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
