from .cache.connection.init import Cache
from wsgi import create_app
from .routes.userRoute import userRoute

app = create_app()
# define all routes and connect them here
@app.route('/route_name')
def method_name():
    userRoute()
