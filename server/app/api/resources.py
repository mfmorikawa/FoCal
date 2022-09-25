from datetime import datetime
from flask_restful import Resource
from app import db
from ..models import User, Project, Task
from . import api

test_user_id = 1

# ? Might not need to have users as a resource
class UserListAPI(Resource):
    def get(self):
        pass

    def post(self):
        pass


class UserAPI(Resource):
    def get(self, user_id):
        pass

    def put(self, user_id):
        pass

    def delete(self, user_id):
        pass



class ProjectListAPI(Resource):
    def get(self):
        pass

    def post(self):
        pass


class ProjectAPI(Resource):
    def get(self, proj_id):
        pass
    def put(self, proj_id):
        pass

    def delete(self, proj_id):
        pass


class TaskListAPI(Resource):
    def get(self, proj_id):
        pass

    def post(self, proj_id):
        pass


class TaskAPI(Resource):
    def get(self, proj_id, task_id):
        pass

    def put(self, proj_id, task_id):
        pass

    def Delete(self, proj_id, task_id):
        pass


# ? Register endpoints here?
api.add_resource(UserListAPI, "/users", endpoint="users")
api.add_resource(UserAPI, "/users/<int:user_id>", endpoint="user")
api.add_resource(ProjectListAPI, "/projects", endpoint="projects")
api.add_resource(ProjectAPI, "/projects/<int:proj_id>", endpoint="project")
api.add_resource(TaskListAPI, "/projects/<int:proj_id>/tasks", endpoint="tasks")
api.add_resource(
    TaskAPI, "/projects/<int:proj_id>/tasks/<int:task_id>", endpoint="task"
)
