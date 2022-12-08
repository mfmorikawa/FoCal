from api import db
from api.model.project import Project
from api.model.user import User
from api.model.task import Task
from api.schemas.task import TasksSchema
from api.services.guards import authorization_guard
from flask import Blueprint, g, request
from marshmallow import ValidationError
from flask import current_app

task_api = Blueprint("task_api", __name__)

tasks_schema = TasksSchema()


@task_api.get("/<string:userID>/tasks", endpoint = "getTaskList")
def getTaskList(userID):
    tasks = Task.query.join(Project).filter(Project.userID == userID).all()
    result = tasks_schema.dump(tasks, many=True)
    return result, 200


@task_api.post("/<string:userID>/tasks", endpoint = "createTask")
def createTask(userID):

    json_data = request.get_json()

    if not json_data:
        return {"message": "Empty request"}, 400

    try:
        data = tasks_schema.load(json_data)
    except ValidationError as err:
        print(err.messages)
        return err.messages, 422

    if data.get("projectID") is None:
        defaultProj = Project.query.join(User).filter(Project.name =="No Project" and User.userID == userID).first()
        if defaultProj is None:
            return {"message":"Database error"}, 400
        data["projectID"] = defaultProj.projectID

    new_task = Task(**data)
    db.session.add(new_task)
    db.session.commit()
    result = tasks_schema.dump(new_task)
    return result, 201


@task_api.get("/<string:userID>/tasks/<uuid:taskID>", endpoint = "getTask")
def getTask(userID,taskID):
    task = Task.query.filter(Task.taskID == taskID).first_or_404()
    task["projectID"] = Project.get(task["projectID"])
    result = tasks_schema.dump(task)
    return result, 200

@task_api.put("/<string:userID>/tasks/<uuid:taskID>", endpoint = "editTask")
def editTask(userID,taskID):
    json_data = request.get_json()
    
    current_app.logger.debug(json_data)
    print(json_data)
    if not json_data:
        return {"message": "Empty request"}, 400
    try:
        updated_data = tasks_schema.load(json_data)
    except ValidationError as err:
        print(err.messages)
        return err.messages, 422

    if updated_data["taskID"] != taskID:
        return {"message":"Task does not match endpoint"}, 403

    # Have to use query object to handle case where creation is necessary
    taskQuery = Task.query.filter(Task.taskID == taskID)
    task = taskQuery.first_or_404()

    # Check if resource with 'taskID' exists
    # TODO: See if I can do this in a slightly cleaner way
    

    if task.project.user.userID != userID:
        return {"message":"User does not own task"}, 403
    taskQuery.update(updated_data)

    db.session.commit()

    result = tasks_schema.dump(task)

    return result, 200   

@task_api.delete("/<string:userID>/tasks/<uuid:taskID>")
def deleteTask(userID, taskID):
    task = Task.query.get(taskID)
    
    if task is None:
        return {"message":"Task does not exist."}, 404
    if task.project.user.userID != userID:
        return {"message":"User does not own task"}, 403
    db.session.delete(task)
    db.session.commit()

    return {}, 204

