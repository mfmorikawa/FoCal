from flask import jsonify, abort

DATE_FORMAT_STRING = "%Y-%m-%d %H:%M:%S"

def json_abort(status_code, data=None):
    response = jsonify(data)
    response.status_code = status_code
    abort(response)