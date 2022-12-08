from uuid import uuid4
from marshmallow import Schema, fields, post_load, post_dump
from api.schemas.task import TasksSchema
from api.model.project import ImportantDates
from api.schemas.important_dates import ImportantDatesSchema
from api.services.utils import DATE_FORMAT_STRING
from api.model.task import Task
from api import db


class ProjectsSchema(Schema):
    userName = fields.Str()
    projectID = fields.UUID()
    name = fields.Str()
    deadline = fields.DateTime(DATE_FORMAT_STRING)
    tasks = fields.List(fields.Nested(TasksSchema))
    totalTasks = fields.Int()
    tasksCompleted = fields.Int()
    importantDates = fields.List(fields.Nested(ImportantDatesSchema))

    @post_load
    def createImportantDates(self, data: dict, **kwargs):
        dates = data.get("importantDates")
        if dates is None:
            return data
        projectID = uuid4()
        if data.get("projectID") is None:
            data["projectID"] = projectID
        data["importantDates"] = [ImportantDates(projectID=projectID, **date) for date in dates]
        return data

    @post_dump
    def calculateProgress(self, data: dict, **kwargs):
        projectID = data["projectID"]
        data["tasksCompleted"] = Task.query.filter(Task.isCompleted == True, Task.projectID == projectID).count()
        data["totalTasks"] = Task.query.filter(Task.projectID == projectID).count()
        return data
