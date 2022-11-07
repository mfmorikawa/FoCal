from flask import Blueprint
from datetime import datetime
from api.schemas.task import TasksSchema
from time import strftime
from flask import request
from marshmallow import ValidationError
from api import db
from services.auth import require_auth
from api.model.task import Task
from api.model.project import Project

task_api = Blueprint("task_api", __name__)

tasks_schema = TasksSchema()


@task_api.get("/tasks", endpoint = "getTaskList")
def getTaskList():
    tasks = Task.query.all()
    result = tasks_schema.dump(tasks, many=True)
    return {"tasks": result}


@task_api.post("/tasks", endpoint = "createTask")
def createTask():

    json_data = request.get_json()

    if not json_data:
        return {"message": "Empty request"}, 400

    try:
        data = tasks_schema.load(json_data)
    except ValidationError as err:
        print(err.messages)
        return err.messages, 422

    if data.get("projectID") is None:
        data["projectID"] = (
            Project.query.filter(Project.name == "No Project").first().objectID
        )
    new_task = Task(**data)
    db.session.add(new_task)
    db.session.commit()
    result = tasks_schema.dump(new_task)
    return {"message": "New task created.", "task": result}, 201


@task_api.get("tasks/<uuid:task_id>", endpoint = "getTask")
@require_auth(None)
def getTask(task_id):
    task = Task.query.filter(Task.objectID == task_id).first_or_404()
    task["projectID"] = Project.get(task["projectID"])
    result = tasks_schema.dump(task)
    return{"task":result}, 200

@task_api.put("tasks/<uuid:task_id>", endpoint = "editTask")
@require_auth(None)
def editTask(task_id):
    json_data = request.get_json()
    if not json_data:
        return {"message": "Empty request"}, 400
    try:
        updated_data = tasks_schema.load(json_data)
    except ValidationError as err:
        print(err.messages)
        return err.messages, 422

    # Have to use query object to handle case where creation is necessary
    task = Task.query.filter(Task.objectID == task_id)

    # Check if resource with 'task_id' exists
    # TODO: See if I can do this in a slightly cleaner way
    if not task.first():
        return {"message": "Task not found"}, 404

    task.update(updated_data)
    task = task.first()

    db.session.commit()

    result = tasks_schema.dump(task)

    return {"message": "Task updated.", "task": result}, 200   

@task_api.delete("tasks/<uuid:task_id>")
@require_auth(None)
def deleteTask(task_id):
    task = Task.query.filter(Task.objectID == task_id).first_or_404()

    db.session.delete(task)
    db.session.commit()
    return {}, 204

