from datetime import datetime
from init import db



class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique = True)
    email = db.Column(db.String, unique = True)
    join_date = db.Column(db.DateTime, nullable = False , default = datetime.utcnow)

    projects = db.relationship("Project", backref = "user")

class Project(db.Model):
    __tablename__ = "project"

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable = False)
    name = db.Column(db.String)
    description = db.Column(db.String)
    creation_date = db.Column(db.DateTime, nullable = False, defualt = datetime.utcnow)
    deadline = db.Column(db.DateTime)

    tasks = db.relationship("Task", back_populates = "project")

class Task(db.Model):
    __tablename__ = "task"
    id = db.Column(db.Integer, primary_key = True)
    project_id = db.Column(db.Integer, db.ForeignKey("project.id"), nullable = False)
    name = db.Column(db.String)
    duration_minutes = (db.Integer)
    completed = db.Column(db.Boolean, default = False)
    




