from sqlalchemy.orm import Session
from sqlalchemy import func
from models.user_model import UserModel
from enums.user_sort_fields_type import userSortFieldsType

def create(db: Session, user_data: dict):
        user = UserModel(**user_data.dict(exclude={"password", "user_id"})) 
        db.add(user) 
        db.commit()
        return user


def get_list(
    db: Session,
    q: str | None = None,
    sort_by: str | None = None,
    order: str | None = None,
    page: int = 1,
    page_size: int = 50
) -> list[UserModel]:
    """
    Get a paginated and filtered list of users.
    
    Args:
        db: Database session
        q: Search query string
        sort_by: Field to sort by
        order: Sort order ('asc' or 'desc')
        page: Page number (1-based)
        page_size: Number of items per page
        
    Returns:
        List of UserModel instances
    """
    query = db.query(UserModel)

    if q:
        search_term = f"%{q.lower()}%"
        query = query.filter(
            func.lower(UserModel.first_name).like(search_term) |
            func.lower(UserModel.last_name).like(search_term) |
            func.lower(UserModel.username).like(search_term)
        )

    if sort_by in userSortFieldsType.list():
        column = getattr(UserModel, sort_by)
        column = func.lower(column)
        query = query.order_by(column.desc() if order == 'desc' else column.asc())
    
    # Apply pagination
    # offset = (page - 1) * page_size
    # return query.offset(offset).limit(page_size).all()
    return query.all()

def get(db: Session, user_id=None):
    return db.query(UserModel).filter(UserModel.user_id == user_id).one_or_none()

def patch(db: Session, user_data: dict):
    user = db.query(UserModel).filter(UserModel.user_id == user_data.user_id).one_or_none()
    if user:
        for key, value in user_data.dict().items():
            setattr(user, key, value)
        db.commit()
        return user

def get_by_sso_user_id(db: Session, sso_user_id=None):
    return db.query(UserModel).filter(UserModel.sso_user_id == sso_user_id).one_or_none()
