from fastapi import Query, APIRouter, Request
from fastapi.responses import FileResponse
from starlette import status
from typing import Optional
from handlers import audit_handler
from builders.audit_excel_build import AuditExcelBuilder


from config.database_connection import get_db, db_dependency

router = APIRouter()

get_db()

@router.get("/audits", status_code=status.HTTP_200_OK)
async def get_audits(db: db_dependency, 
                     q: Optional[str] = Query(None), 
                     sort_by: str = 'timestamp',
                     order: str = 'desc',
                     date: Optional[str] = None):
    audits = audit_handler.get_list(db, q=q, sort_by=sort_by, order=order, date=date)
    return audits

@router.post("/xslx-audits-exports", status_code=status.HTTP_200_OK)
async def create_xlsx_audit_export(db: db_dependency,
                                    q: Optional[str] = Query(None), 
                                    sort_by: str = 'timestamp',
                                    order: str = 'desc',
                                    date: Optional[str] = None):
    
    audits = audit_handler.get_list(db, q=q, sort_by=sort_by, order=order, date=date)

    _, export_path = AuditExcelBuilder(audit_data=audits).build_excel()
    filename = export_path.split('/')[-1]
    return FileResponse(
        path=export_path,
        media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        filename=filename)