from enums.sso_fields_type import SsoFieldsType

def updated_fields(existing_user, updated_user):
    new_existing_user = {}

    for k,v in existing_user.items():
        if k in SsoFieldsType.list() and existing_user.get(k) != updated_user.get(k):
            new_existing_user[k] = updated_user.get(k)

    return new_existing_user