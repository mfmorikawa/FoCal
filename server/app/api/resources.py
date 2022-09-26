from datetime import datetime
from time import strftime
from flask_restful import Resource, fields, marshal_with, reqparse
from app import db
from ..models import Task, TasksSchema
from . import api




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

#Load schemas here
tasks_schema = TasksSchema()


class TaskListAPI(Resource):
    def get(self):
        tasks = Task.query.all()
        result = tasks_schema.dump(tasks, many=True)
        return {"tasks":result}

    def post(self):

        pass


class TaskAPI(Resource):
    def get(self, task_id):

        task = Task.query.filter(Task.id==task_id).first_or_404()
        
        result = tasks_schema.dump(task)
        return {"task":result}

    def put(self, task_id):
        pass

    def Delete(self, task_id):
        pass


# #Register endpoints here

# api.add_resource(UserListAPI, "/users", endpoint="users")
# api.add_resource(UserAPI, "/users/<int:user_id>", endpoint="user")
# api.add_resource(ProjectListAPI, "/projects", endpoint="projects")
# api.add_resource(ProjectAPI, "/projects/<int:proj_id>", endpoint="project")

api.add_resource(TaskListAPI, "/tasks", endpoint="tasks")
api.add_resource(TaskAPI, "/tasks/<int:task_id>", endpoint="task")
