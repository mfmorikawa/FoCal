from marshmallow import Schema,fields

class TasksSchema(Schema):
    objectID = fields.UUID()
    title = fields.Str()
    start = fields.DateTime("%Y-%m-%d %H:%M:%S")
    end = fields.DateTime("%Y-%m-%d %H:%M:%S")
    projectID = fields.UUID()
    isAllDay = fields.Boolean()
    isCompleted = fields.Boolean()