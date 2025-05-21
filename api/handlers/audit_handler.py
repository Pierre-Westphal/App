from models.audit_model import AuditModel
from sqlalchemy.orm import Session

def create(db: Session, audit_data: dict):
        audit = AuditModel(**audit_data)
        db.add(audit)
        db.commit()
        return audit