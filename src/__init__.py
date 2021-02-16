from flask import Flask
from ddtrace import patch_all

patch_all()

def create_app():
    app = Flask(__name__, instance_relative_config=False)

    return app