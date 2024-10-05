from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from starlette import status


class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, keycloak_manager):
        super().__init__(app)
        self.keycloak_manager = keycloak_manager

    async def dispatch(self, request: Request, call_next):
        try:
            await self.verify_token_from_header(request)
            return await call_next(request)
        except HTTPException:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Unauthorized"},
            )

    async def verify_token_from_header(self, request: Request):
        
        access_token: str = request.headers.get("Authorization")
        refresh_token: str = request.headers.get("refresh_token")
        
        # self.keycloak_manager.tokens = {"access_token": access_token.split(" ")[1], "refresh_token": refresh_token}

        if not self.keycloak_manager.is_token_valid(access_token):
            print("ERROR TOKEN INVALIDE")
            # raise HTTPException(
            #     status_code=status.HTTP_401_UNAUTHORIZED,
            #     detail="Token invalide.",
            #     headers={"WWW-Authenticate": "Bearer"},
            # )