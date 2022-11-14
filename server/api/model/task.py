import uuid
from . import db
from sqlalchemy_utils import UUIDType


class Task(db.Model):
    __tablename__ = "task"
    taskID = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    projectID = db.Column(UUIDType(binary=False), db.ForeignKey("project.projectID"))
    title = db.Column(db.String, nullable=False)
    start = db.Column(db.DateTime)
    end = db.Column(db.DateTime)
    isAllDay = db.Column(db.Boolean, default=False)

    # Whether or not the task has been completed, should be used for UI purposes
    isCompleted = db.Column(db.Boolean, default=False)
