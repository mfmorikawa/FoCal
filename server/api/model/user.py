from . import db
from datetime import datetime, timezone

class User(db.Model):
    __tablename__ = "user"

    userID = db.Column(db.Integer, primary_key=True)
    auth0ID = db.Column(db.String)
    join_date = db.Column(
        db.DateTime, nullable=False, default=datetime.now(tz=timezone.utc)
    )

    projects = db.relationship("Project", backref="user")