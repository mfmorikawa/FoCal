from . import routing
from flask import send_from_directory

@routing.route("/")
def index():
    return send_from_directory(routing.static_folder, "index.html")