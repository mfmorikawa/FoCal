import uuid
from . import db
from datetime import datetime, timezone
from sqlalchemy_utils import UUIDType


class Project(db.Model):
    __tablename__ = "project"

    projectID = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    userID = db.Column(db.String, db.ForeignKey("user.userID"), nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    creation_date = db.Column(db.DateTime, default=datetime.now(tz=timezone.utc))
    deadline = db.Column(db.DateTime)

    tasks = db.relationship("Task",cascade="all, delete", backref="project")
    important_dates = db.relationship("ImportantDates",cascade="all, delete", backref="project")


class ImportantDates(db.Model):
    __tablename__ = "important_date"
    dateID = db.Column(db.Integer, primary_key=True)
    projectID = db.Column(
        db.Integer, db.ForeignKey("project.projectID"), nullable=False
    )
    title = db.Column(db.String)
    date = db.Column(db.DateTime)
