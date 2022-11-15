from marshmallow import Schema,fields
from api.schemas.task import TasksSchema
from api.schemas.important_dates import ImportantDatesSchema
from api.services.utils import DATE_FORMAT_STRING

class ProjectsSchema(Schema):
    projectID = fields.UUID()
    name = fields.Str()
    deadline = fields.DateTime(DATE_FORMAT_STRING)
    tasks = fields.List(fields.Nested(TasksSchema))
    importantDates = fields.List(fields.Nested(ImportantDatesSchema))

