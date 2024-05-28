from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'ghajshfadhasodjo'
    app.config['JWT_SECRET_KEY'] = 'proiect-nokia-cloud'

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    CORS(app)

    from server.blueprints.user import user_bp
    from server.blueprints.ssh import ssh_bp
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(ssh_bp, url_prefix='/ssh')

    return app
