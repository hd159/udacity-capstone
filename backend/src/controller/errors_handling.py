from flask import abort, jsonify
from . import routes

class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code
        abort(self.status_code)

@routes.errorhandler(404)
def not_found():
    return (
        jsonify(
                {
                    "success": False, 
                    "status": 404, 
                    "message": "resource not found"
                }
            ),
        404,
    )


@routes.errorhandler(422)
def unprocessable(error):
    return (
        jsonify(
                {
                    "success": False, 
                    "status": 422, 
                    "message": "unprocessable"
                }
            ),
        422,
    )

@routes.errorhandler(400)
def bad_request(error):
    return (
        jsonify(
                {
                    "success": False, 
                    "status": 400, 
                    "message": "bad request"
                }
            ),
        400,
    )

@routes.errorhandler(401)
def unauthorized(error):
    code = ''
    message = ''
    if type(error.description) == str :
        code = 'Authorization'
        message = error.description
    elif type(error.description) == dict :
        code = error.description['code']
        message = error.description['description']
    
    return (
        jsonify(
                {
                    "success": False, 
                    "code": code, 
                    "message": message,
                    "status": error.code
                }
            ),
        401,
    )

@routes.errorhandler(500)
def server_err(error):
    return (
        jsonify(
                {
                    "success": False, 
                    "status": error.code, 
                    "message": error.description
                }
            ),
        500,
    )