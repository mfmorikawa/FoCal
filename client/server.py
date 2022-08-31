from flask import Flask

def create_app():
    app = Flask(_name_)
    
    @app.route('/')
    def index():
        return '<h1>index route</h1>'
    
    return app

# https://www.datasciencelearner.com/react-with-python-flask-api/
# https://flask.palletsprojects.com/en/2.2.x/quickstart/#a-minimal-application
# https://www.sqlalchemy.org/features.html
              
