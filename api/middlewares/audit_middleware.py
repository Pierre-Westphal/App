from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from datetime import datetime, timezone
from handlers import audit_handler
from config.database_connection import get_db

class AuditMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)

    async def dispatch(self, request: Request, call_next):
        if request.method in ("POST", "PATCH"):
            db = next(get_db())
            audit_entry = {
                'path': request.url.path,
                'method': request.method,
                'timestamp': datetime.now(timezone.utc),
                'user_id': request.headers.get("current-user-id"),
                'details': str(await request.body())
            }
            audit_handler.create(db, audit_entry)
        response = await call_next(request)
        return response