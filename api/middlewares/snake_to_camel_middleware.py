import json
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

def snake_to_camel(snake_str):
    parts = snake_str.split('_')
    return parts[0] + ''.join(word.capitalize() for word in parts[1:])

def transform_keys_to_camel(obj):
    if isinstance(obj, dict):
        return {snake_to_camel(k): transform_keys_to_camel(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [transform_keys_to_camel(i) for i in obj]
    return obj

class SnakeToCamelMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)

        if "application/json" in response.headers.get("content-type", ""):
            body = b"".join([chunk async for chunk in response.body_iterator])
            try:
                data = json.loads(body)
                transformed = transform_keys_to_camel(data)
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