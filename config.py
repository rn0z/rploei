from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))


class Config:
    SQLALCHEMY_DATABASE_URI         = environ.get('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS  = environ.get('SQLALCHEMY_TRACK_MODIFICATIONS')
    CORS_HEADERS                    = environ.get('CORS_HEADERS')
    FLASK_APP                       = environ.get('FLASK_APP')
    FLASK_ENV                       = environ.get('FLASK_ENV')
    SECRET_KEY                      = environ.get('SECRET_KEY')