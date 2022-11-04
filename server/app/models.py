"""Create database models as well as marhmallow schemas for serialization/deserialization"""

from datetime import datetime, timezone
from marshmallow import Schema, fields
from sqlalchemy_utils import UUIDType
import uuid
from . import db


class User(db.Model):
    __tablename__ = "user"

    userID = db.Column(db.Integer, primary_key=True)
    auth0ID = db.Column(db.String)
    join_date = db.Column(
        db.DateTime, nullable=False, default=datetime.now(tz=timezone.utc)
    )

    projects = db.relationship("Project", backref="user")


class Project(db.Model):
    __tablename__ = "project"

    projectID = db.Column(db.Integer, primary_key=True)
    objectID = db.Column(UUIDType(binary=False), default=uuid.uuid4)
    userID = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    creation_date = db.Column(
        db.DateTime,  default=datetime.now(tz=timezone.utc)
    )
    deadline = db.Column(db.DateTime)

    tasks = db.relationship("Task", backref="project")
    important_dates = db.relationship("ImportantDates", backref="project")


class ImportantDates(db.Model):
    __tablename__ = "important_date"
    dateID = db.Column(db.Integer, primary_key=True)
    projectID = db.Column(db.Integer, db.ForeignKey("project.id"), nullable=False)
    title = db.Column(db.String)
    date = db.Column(db.DateTime)

class Task(db.Model):
    __tablename__ = "task"
    taskID = db.Column(db.Integer, primary_key=True)
    projectID = db.Column(UUIDType(binary=False), db.ForeignKey("project.objectID"))
    objectID = db.Column(UUIDType(binary=False), default=uuid.uuid4)
    title = db.Column(db.String, nullable=False)
    start = db.Column(db.DateTime)
    end = db.Column(db.DateTime)
    isAllDay = db.Column(db.Boolean, default=False)

    # Whether or not the task has been completed, should be used for UI purposes
    isCompleted = db.Column(db.Boolean, default=False)


# SCHEMAS


class TasksSchema(Schema):
    objectID = fields.UUID()
    title = fields.Str()
    start = fields.DateTime("%Y-%m-%d %H:%M:%S")
    end = fields.DateTime("%Y-%m-%d %H:%M:%S")
    projectID = fields.UUID()
    isAllDay = fields.Boolean()
    isCompleted = fields.Boolean()
