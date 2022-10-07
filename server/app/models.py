"""Create database models as well as marhmallow schemas for serialization/deserialization"""
from marshmallow import Schema, fields
from sqlalchemy_utils import UUIDType
import uuid
from . import db


# class User(db.Model):
#     __tablename__ = "user"

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String, unique=True)
#     email = db.Column(db.String, unique=True)
#     join_date = db.Column(
#         db.DateTime, nullable=False, default=datetime.now(tz=timezone.utc)
#     )

#     projects = db.relationship("Project", backref="user")


# class Project(db.Model):
#     __tablename__ = "project"

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
#     name = db.Column(db.String, nullable=False)
#     description = db.Column(db.String)
#     creation_date = db.Column(
#         db.DateTime, nullable=False, default=datetime.now(tz=timezone.utc)
#     )
#     deadline = db.Column(db.DateTime)

#     tasks = db.relationship("Task", backref="project")


class Task(db.Model):
    __tablename__ = "task"
    id = db.Column(db.Integer, primary_key=True)
    # project_id = db.Column(db.Integer, db.ForeignKey("project.id"), nullable=False)
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
    isAllDay = fields.Boolean()
    isCompleted = fields.Boolean()
