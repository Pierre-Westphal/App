from fastapi import HTTPException, Query, APIRouter
from starlette import status
from typing import List, Optional
from handlers import audit_handler

from config.database_connection import get_db, db_dependency

router = APIRouter()

get_db()

@router.get("/audits", status_code=status.HTTP_200_OK)
async def get_audits(db: db_dependency, 
                     q: Optional[str] = Query(None), 
                     sort_by: str = 'timestamp',
                     order: str = 'desc'):

    audits = audit_handler.get_list(db, q=q, sort_by=sort_by, order=order)
    return audits