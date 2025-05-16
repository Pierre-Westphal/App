def create_user_dict_for_keycloak(user):
    return {
        "firstName": user.first_name,
        "lastName": user.last_name,
        "email": user.email,
        "username": user.username,
        "enabled": True,
        "credentials": [
            {
            "type": "password",
            "value": user.password,
            "temporary": False
            }
        ]
    }