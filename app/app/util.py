from rest_framework import status

def success(self, data):
    response = {
        "data": data,
        "status" : "success",
        "code": status.HTTP_200_OK
    }
    return response

def created(self, data):
    response = {
        "data": data,
        "status": "success",
        "code": status.HTTP_201_CREATED
    }
    return response

def updated(self, data):
    response = {
        "data": data,
        "status": "success",
        "code": status.HTTP_200_OK
    }
    return response

def deleted(self):
    response = {
        "data": {},
        "status": "success",
        "code": status.HTTP_204_NO_CONTENT
    }
    return response

def error(self, data):
    response = {
        "data": data,
        "status": "failed",
        "code"   : status.HTTP_400_BAD_REQUEST
    }
    return response

def unauthorized(self):
    response = {
        "data": {"error": "Unauthorized access"},
        "status": "failed",
        "code": status.HTTP_401_UNAUTHORIZED
    }
    return response

def forbidden(self, message="Forbidden"):
    response = {
        "data": {"error": message},
        "status": "failed",
        "code": status.HTTP_403_FORBIDDEN
    }
    return response

def not_found(self, message="Resource Not Found"):
    response = {
        "data": {"error": message},
        "status": "failed",
        "code": status.HTTP_404_NOT_FOUND
    }
    return response