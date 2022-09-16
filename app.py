#from .cache.connection.init import Cache
#from .routes.userRoute import userRoute
from flask import Flask, send_from_directory

app = Flask(__name__, static_url_path='', static_folder='client/build')

# Note only works in production, for dev have to start react dev server
# and flask dev server for the api
@app.route('/')
def index():
    return send_from_directory(app.static_folder,"index.html")

