from marshmallow import Schema, fields


class UsersSchema(Schema):
    userID = fields.Str()
    password = fields.Str()
    