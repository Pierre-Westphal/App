
def transform_dict_keys(obj, func):
    if isinstance(obj, dict):
        return {func(k): transform_dict_keys(v, func) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [transform_dict_keys(i, func) for i in obj]
    return obj