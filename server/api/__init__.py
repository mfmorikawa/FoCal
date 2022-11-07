from flask import Flask
from config import config
from api.model import db
from api.model.project import Project, ImportantDates
from api.model.task import Task
from api.model.user import User

from api.route.tasks import task_api





def create_app(config_name = "default"):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    db.init_app(app)
    db.create_all(app=app)
    app.register_blueprint(task_api, url_prefix="/api")
    return app