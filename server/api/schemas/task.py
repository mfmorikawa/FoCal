from marshmallow import Schema, fields, post_load, post_dump
from api.services.utils import DATE_FORMAT_STRING


class ResourceSchema(Schema):
    taskID = fields.UUID()
    projectID = fields.UUID()
    isCompleted = fields.Boolean()


class TasksSchema(Schema):
    title = fields.Str()
    start = fields.DateTime(DATE_FORMAT_STRING)
    end = fields.DateTime(DATE_FORMAT_STRING)
    isAllDay = fields.Boolean()
    resource = fields.Nested(ResourceSchema)

    @post_load
    def processInputData(self, data: dict, **kwargs):
        """Expand the nested resource field to allow for easy db interaction."""
        resource = data["resource"]
        data.pop("resource")
        data.update(resource)
        return data

    @post_dump(pass_original=True)
    def processOutputData(self, data, original_data, **kwargs):
        """Add taskID, projectID, isCompleted attributes of a task to a nested resource object"""
        resource = {
            "taskID": original_data.taskID,
            "projectID": original_data.projectID,
            "isCompleted": original_data.isCompleted,
        }

        data["resource"] = resource
        return data
