from fastapi import HTTPException

def return_error(message, status_code):
    return HTTPException(status_code=status_code, detail=message)