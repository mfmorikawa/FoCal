from datetime import datetime, timezone
from . import db


class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    join_date = db.Column(
        db.DateTime, nullable=False, default=datetime.now(tz=timezone.utc)
    )

    projects = db.relationship("Project", backref="user")


class Project(db.Model):
    __tablename__ = "project"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    creation_date = db.Column(
        db.DateTime, nullable=False, default=datetime.now(tz=timezone.utc)
    )
    deadline = db.Column(db.DateTime)

    tasks = db.relationship("Task", backref="project")


class Task(db.Model):
    __tablename__ = "task"
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey("project.id"), nullable=False)
    name = db.Column(db.String, nullable=False)
    duration_minutes = db.Column(db.Integer)
    # Whether or not the task has been completed, should be used for UI purposes
    completed = db.Column(db.Boolean, default=False)
