import json
import re
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from helpers.dict_helper import transform_dict_keys

def camel_to_snake(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

class CamelToSnakeMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method in ("POST", "PUT", "PATCH") and request.headers.get("content-type", "").startswith("application/json"):
            body_bytes = await request.body()
            try:
                raw_json = json.loads(body_bytes)
                transformed_json = transform_dict_keys(raw_json, camel_to_snake)
                new_body = json.dumps(transformed_json).encode("utf-8")
                request._body = new_body  # injecter dans la requête
                request._receive = lambda: {"type": "http.request", "body": new_body, "more_body": False}
            except json.JSONDecodeError:
                pass  # laisser passer si non JSON valide

        response = await call_next(request)
        return response