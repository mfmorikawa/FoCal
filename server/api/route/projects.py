from flask import Blueprint
from api.schemas.project import ProjectsSchema
from flask import request
from marshmallow import ValidationError
from api import db
from api.services.guards import authorization_guard
from api.model.project import Project
from sqlalchemy.exc import IntegrityError
from api.model.user import User
from api.model.task import Task
from flask import g


project_api = Blueprint("project_api", __name__)

projects_schema = ProjectsSchema()


#TODO: Return object itself

@project_api.get("/<string:username>/projects", endpoint="getProjectList")
def getProjectList(username):
    
    projects = Project.query.join(User).filter(User.userID == username).all()
    result = projects_schema.dump(projects, many=True)
    return result, 200


@project_api.post("/<string:userID>/projects", endpoint="createProject")
def createProject(userID):

    json_data = request.get_json()
    print(json_data)

    if not json_data:
        return {"message": "Empty request"}, 400

    try:
        data = projects_schema.load(json_data)
    except ValidationError as err:
        print(err.messages)
        return err.messages, 422

    try:
        new_project = Project(**data)
        new_project.userID = userID
        db.session.add(new_project)
        db.session.commit()
    except IntegrityError:
        return {"message": "Error creating project"}, 400

    result = projects_schema.dump(new_project)
    return result, 201


@project_api.get("/<userID>/projects/<uuid:projectID>", endpoint="getProject")
def getProject(userID, projectID):
    project = Project.query.get(projectID)
    if project is None:
        return {"message": "Project does not exist."}, 404
    result = projects_schema.dump(project)
    return result, 200


@project_api.put("/<userID>/projects/<uuid:projectID>", endpoint="editProject")
def editProject(userID, projectID):
    json_data = request.get_json()
    if not json_data:
        return {"message": "Empty request"}, 400
    try:
        updated_data = projects_schema.load(json_data)
    except ValidationError as err:
        return err.messages, 422

    if updated_data["projectID"] != projectID:
        return {"message":"projectID does not match url"}, 403
    # Have to use query object to handle case where creation is necessary
    try:
        Project.query.filter(Project.projectID == projectID).update(
            values=updated_data
        )
        db.session.commit()
    except Exception as e:
        return {"message": e}

    project = Project.query.get(projectID)
    result = projects_schema.dump(project)

    return result, 200


@project_api.delete("/<userID>/projects/<uuid:projectID>")
def deleteProject(userID, projectID):
    project = Project.query.get(projectID)
    if project is None:
        return {"message": "Project does not exist"}, 404

    if project.userID != userID:
        return {"message":"User does not own project"}, 403
    db.session.delete(project)
    db.session.commit()
    return {}, 204



