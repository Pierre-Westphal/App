import json
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
from helpers.dict_helper import transform_dict_keys

def snake_to_camel(snake_str):
    parts = snake_str.split('_')
    return parts[0] + ''.join(word.capitalize() for word in parts[1:])

class SnakeToCamelMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)

        if "application/json" in response.headers.get("content-type", ""):
            body = b"".join([chunk async for chunk in response.body_iterator])
            try:
                data = json.loads(body)
                transformed = transform_dict_keys(data, snake_to_camel)
                new_body = json.dumps(transformed).encode("utf-8")

                headers = dict(response.headers)
                headers.pop("content-length", None)

                return Response(
                    content=new_body,
                    status_code=response.status_code,
                    headers=headers,
                    media_type="application/json"
                )
            except json.JSONDecodeError:
                pass

        return response