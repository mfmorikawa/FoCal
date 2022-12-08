from marshmallow import Schema, fields
from api.services.utils import DATE_FORMAT_STRING

class ImportantDatesSchema(Schema):
    date = fields.Date(DATE_FORMAT_STRING)
    name = fields.Str()