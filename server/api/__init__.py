from flask import Flask
from config import config
from api.model import db
from dotenv import load_dotenv
from os import getenv
from flask_cors import CORS
from api.model.project import Project, ImportantDates
from api.model.task import Task
from api.model.user import User
from api.services.auth0_service import auth0_service

from api.route.tasks import task_api
load_dotenv("../.env")
AUTH0_DOMAIN = getenv("AUTH0_DOMAIN")
AUTH0_AUDIENCE = getenv("AUTH0_AUDIENCE")
CLIENT_ORIGIN_URL=getenv("CLIENT_ORIGIN_URL")
auth0_service.initialize(AUTH0_DOMAIN, AUTH0_AUDIENCE)

def create_app(config_name="default"):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    db.init_app(app)
    db.create_all(app=app)
    CORS(
        app,
        resources={r"/api/*": {"origins": CLIENT_ORIGIN_URL}},
        allow_headers=["Authorization", "Content-Type"],
        methods=["GET", "POST", "PUT", "DELETE"],
        max_age=86400,
    )
    app.register_blueprint(task_api, url_prefix="/api")
    return app
