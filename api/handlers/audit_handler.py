from models.audit_model import AuditModel
from models.user_model import UserModel
from sqlalchemy.orm import Session

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
    ).join(UserModel, AuditModel.user_id == UserModel.user_id).all()
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