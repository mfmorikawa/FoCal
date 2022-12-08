from flask import Blueprint
from api.schemas.user import UsersSchema
from sqlalchemy.exc import IntegrityError
from flask import request
from marshmallow import ValidationError
from api import db
from api.services.guards import (
    permissions_guard,
    authorization_guard,
    admin_users_permissions,
)
from api.model.user import User
from api.model.project import Project
from flask import g

user_api = Blueprint("user_api", __name__)

user_schema = UsersSchema()


@user_api.post("/users")
def addUser():
    json_data = request.get_json()

    if not json_data:
        return {"message": "Empty request"}, 400

    try:
        print(json_data)
        data = user_schema.load(json_data)
    except ValidationError as err:
        return err.messages, 422
    try:
        newUser = User(**data)
        db.session.add(newUser)
        defaultProject = Project(user=newUser, name="No Project")
        db.session.add(defaultProject)
        db.session.commit()
    except IntegrityError as e:
        return {"message": "User already exists."}, 422
    return {"message": "User created"}, 201


@user_api.delete("/users/<string:user_id>")
def deleteUser(user_id):
    user = User.query.get(user_id)
    if user is None:
        return {"message":"User does not exist."}, 404
    db.session.delete(user)
    db.session.commit()

    return {}, 204
