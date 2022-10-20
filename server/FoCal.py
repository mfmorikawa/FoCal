import os
from app import create_app, db
from app.models import User, Task, Project, ImportantDates

app = create_app(os.getenv('FLASK_CONFIG') or 'default')


@app.shell_context_processor
def make_shell_context():
    return dict(db=db, Task=Task, Project=Project, ImportantDates=ImportantDates, User = User)