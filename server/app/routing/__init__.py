from flask import Blueprint


#! Currently does not work properly
routing = Blueprint("routing", __name__, static_url_path="", static_folder="../../../client/dist")

from . import routes