from . import db
from datetime import datetime, timezone

class User(db.Model):
    __tablename__ = "user"

    userID = db.Column(db.String, primary_key = True)
    join_date = db.Column(
        db.DateTime, nullable=False, default=datetime.now(tz=timezone.utc)
    )

    projects = db.relationship("Project",cascade="all, delete", backref="user")