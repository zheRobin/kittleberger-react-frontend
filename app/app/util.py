from rest_framework import status
def success(self, data):
    response = {
        "data":data,
        "status" : "success",
        "code"   : status.HTTP_200_OK
    }
    return response

def error(self, data):
    response = {
        "data":data,
        "status" :"failed",
        "code"   : status.HTTP_400_BAD_REQUEST
    }
    return response

def chunks(lst, n):
    for i in range(0, len(lst), n):
        yield lst[i:i + n]