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


@user_api.delete("/users/<string:userID>")
def deleteUser(userID):
    user = User.query.get(userID)
    if user is None:
        return {"message":"User does not exist."}, 404
    db.session.delete(user)
    db.session.commit()

    return {}, 204


#! This is bad just for presentation
@user_api.post("/users/<string:userID>")
def loginUser(userID):
    user = User.query.get(userID)
    if user is None:
        return {"message":"User does not exist."}, 404

    json_data = request.get_json()
    try:
        data = user_schema.load(json_data)
    except ValidationError as err:
        return err.messages, 422
    
    if user.password != data.get("password"):
        return {"message":"Unauthorized"}, 401
    return {"message":"Login success"}, 200