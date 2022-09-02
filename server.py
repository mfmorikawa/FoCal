from flask import Flask

def create_app():
    app = Flask(__name__)
    
    @app.route('/')
    def index():
        return '<h1>index route</h1>'
   
    @app.route('/route_name')
    def method_name():
        pass
        
        return app

# https://www.datasciencelearner.com/react-with-python-flask-api/
# https://flask.palletsprojects.com/en/2.2.x/quickstart/#a-minimal-application
# https://www.sqlalchemy.org/features.html
              
