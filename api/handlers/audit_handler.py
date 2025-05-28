from models.audit_model import AuditModel
from models.user_model import UserModel
from sqlalchemy.orm import Session
from sqlalchemy import func


def create(db: Session, audit_data: dict):
    audit = AuditModel(**audit_data)
    db.add(audit)
    db.commit()
    return audit

def get_list(db: Session, 
            q: str | None = None,
            sort_by: str | None = None,
            order: str | None = None,):
    
    results = db.query(
            AuditModel.audit_id,
            AuditModel.user_id,
            AuditModel.path,
            AuditModel.method,
            AuditModel.timestamp,
            AuditModel.details,
            UserModel.username
    ).join(UserModel, AuditModel.user_id == UserModel.user_id)

    if q:
        search_term = f"%{q.lower()}%"
        results = results.filter(
            func.lower(AuditModel.path).like(search_term) |
            func.lower(UserModel.username).like(search_term)
        )

    if sort_by:
        if hasattr(AuditModel, sort_by):
            column = getattr(AuditModel, sort_by)
            results = results.order_by(column.desc() if order == 'desc' else column.asc())
        elif hasattr(UserModel, sort_by):
            column = getattr(UserModel, sort_by)
            results = results.order_by(column.desc() if order == 'desc' else column.asc())
    
    results = results.all()
    
    return [
        {
            "audit_id": audit_id,
            "user_id": user_id,
            "path": path,
            "method": method.value if hasattr(method, 'value') else method,
            "timestamp": str(timestamp),
            "details": details,
            "username": username
        }
        for audit_id, user_id, path, method, timestamp, details, username in results
    ]