from flask import Blueprint
from api.schemas.project import ProjectsSchema
from flask import request
from marshmallow import ValidationError
from api import db
from api.services.guards import authorization_guard
from api.model.project import Project
from sqlalchemy.exc import IntegrityError
from api.model.user import User
from flask import g


project_api = Blueprint("project_api", __name__)

projects_schema = ProjectsSchema()


@project_api.get("/projects", endpoint="getProjectList")
@authorization_guard
def getProjectList():
    userID = g.access_token["sub"]
    projects = Project.query.join(User).filter(User.userID == userID).all()
    result = projects_schema.dump(projects, many=True)
    return {"projects": result}


@project_api.post("/projects", endpoint="createProject")
@authorization_guard
def createProject():

    json_data = request.get_json()

    if not json_data:
        return {"message": "Empty request"}, 400

    try:
        data = projects_schema.load(json_data)
    except ValidationError as err:
        print(err.messages)
        return err.messages, 422

    try:
        new_project = Project(**data)
        new_project.userID = g.access_token["sub"]
        db.session.add(new_project)
        db.session.commit()
    except IntegrityError:
        return {"message": "Error creating project"}, 400

    result = projects_schema.dump(new_project)
    return {"message": "New project created.", "project": result}, 201


@project_api.get("projects/<uuid:project_id>", endpoint="getProject")
@authorization_guard
def getProject(project_id):
    project = Project.query.get(project_id)
    if project is None:
        return {"message": "Project does not exist."}, 404
    result = projects_schema.dump(project)
    return {"project": result}, 200


@project_api.put("projects/<uuid:project_id>", endpoint="editProject")
@authorization_guard
def editProject(project_id):
    json_data = request.get_json()
    if not json_data:
        return {"message": "Empty request"}, 400
    try:
        updated_data = projects_schema.load(json_data)
    except ValidationError as err:
        return err.messages, 422

    # Have to use query object to handle case where creation is necessary
    try:
        Project.query.filter(Project.projectID == project_id).update(
            values=updated_data
        )
        db.session.commit()
    except Exception as e:
        return {"message": e}

    project = Project.query.get(project_id)
    result = projects_schema.dump(project)

    return {"message": "Project updated.", "project": result}, 200


@project_api.delete("projects/<uuid:project_id>")
@authorization_guard
def deleteProject(project_id):
    project = Project.query.get(project_id)
    if project is None:
        return {"message": "Project does not exist"}, 404

    db.session.delete(project)
    db.session.commit()
    return {}, 204
