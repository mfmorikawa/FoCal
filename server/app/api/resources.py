from datetime import datetime
from time import strftime
from flask import request
from marshmallow import ValidationError
from app import db
from ..models import Project, Task, TasksSchema
from . import api
from flask_restful import Resource
from .auth import require_auth



#! Endpoints currently broken needs to have some form of user handling before proceeding


# ? Might not need to have users as a resource
# class UserListAPI(Resource):
#     def get(self):
#         pass

#     def post(self):
#         pass


# class UserAPI(Resource):
#     def get(self, user_id):
#         user = User.query.filter_by(id=user_id).first()
#         print(user)
#         # TODO: Error handling
#         if user == None:
#             return {}
#         return {"user": {"id": user.id, "name": user.name, "email": user.email}}

#     def put(self, user_id):
#         pass

#     def delete(self, user_id):
#         pass


# #! TODO: Implement get
# #! TODO: Implement post
# #! TODO: Use user auth to get user
# class ProjectListAPI(Resource):
#     def get(self):
#         pass

#     def post(self):
#         pass


# class ProjectAPI(Resource):
#     def get(self, proj_id):
#         project = Project.query.filter_by(user_id=test_user_id, id=proj_id).first()
#         if project == None:
#             return {}
#         print(project)
#         return {
#             "project": {
#                 "id": project.id,
#                 "user_id": project.user_id,
#                 "name": project.name,
#                 "description": project.description,
#                 "creation_date": datetime.strftime(
#                     project.creation_date, "%Y %m %d %H %M"
#                 ),
#                 "deadline": datetime.strftime(project.deadline, "%Y %m %d $H %M")
#                 if project.deadline
#                 else "N/A",
#             }
#         }

#     def put(self, proj_id):
#         pass

#     def delete(self, proj_id):
#         pass

# Load schemas here
tasks_schema = TasksSchema()

@api.resource( "/tasks", endpoint="tasks")
class TaskListAPI(Resource):

    @require_auth(None)
    def get(self):
        tasks = Task.query.all()
        result = tasks_schema.dump(tasks, many=True)
        return {"tasks": result}

    @require_auth(None)
    def post(self):
        json_data = request.get_json()
        if not json_data:
            return {"message": "Empty request"}, 400

        try:
            data = tasks_schema.load(json_data)
        except ValidationError as err:
            print(err.messages)
            return err.messages, 422
        if data.get("projectID") is None:
            data["projectID"] = Project.query.filter(Project.name == "No Project").first().objectID
        new_task = Task(**data)
        db.session.add(new_task)
        db.session.commit()
        result = tasks_schema.dump(new_task)

        return {"message": "New task created.", "task": result}, 201

@api.resource("/tasks/<uuid:task_id>", endpoint="task")
class TaskAPI(Resource):
    @require_auth(None)
    def get(self, task_id):

        task = Task.query.filter(Task.objectID == task_id).first_or_404()

        result = tasks_schema.dump(task)
        return {"task": result}, 200

    @require_auth(None)
    def put(self, task_id):
        json_data = request.get_json()
        if not json_data:
            return {"message": "Empty request"}, 400
        try:
            updated_data = tasks_schema.load(json_data)
        except ValidationError as err:
            print(err.messages)
            return err.messages, 422

        # Have to use query object to handle case where creation is necessary
        task = Task.query.filter(Task.objectID==task_id)

        # Check if resource with 'task_id' exists
        #TODO: See if I can do this in a slightly cleaner way
        if not task.first():
            return {"message":"Task not found"}, 404
            
        task.update(updated_data)
        task=task.first()

        db.session.commit()

        result = tasks_schema.dump(task)

        return {"message": "Task updated.", "task": result}, 200

    @require_auth(None)
    def delete(self, task_id):
        print(task_id)
        task = Task.query.filter(Task.objectID==task_id).first_or_404()

        db.session.delete(task)
        db.session.commit()
        return {}, 204


# #Register endpoints here

# api.add_resource(UserListAPI, "/users", endpoint="users")
# api.add_resource(UserAPI, "/users/<int:user_id>", endpoint="user")
# api.add_resource(ProjectListAPI, "/projects", endpoint="projects")
# api.add_resource(ProjectAPI, "/projects/<int:proj_id>", endpoint="project")


