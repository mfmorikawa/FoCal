from flask import Blueprint


#? Unsure if I should really have the static_folder hardcoded here
routing = Blueprint("routing", __name__, static_url_path="", static_folder="../../client/build")

from . import routes