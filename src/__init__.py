from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from socket import socket, AF_INET, SOCK_DGRAM

#db = SQLAlchemy()

def create_app():
    """Construct the core APP"""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')
    
    #db.init_app(app)

    #server_addr = ('192.168.1.3', 8888)
    #s = socket(AF_INET, SOCK_DGRAM)
    #s =socket(socket.AF_INET, socket.SO_REUSEADDR, 1)
    #s.bind(server_addr)

    with app.app_context():
        from . import routes

        app.register_blueprint(routes.main_bp)

        #db.create_all()

        return app