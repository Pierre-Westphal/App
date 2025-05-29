from datetime import datetime

def string_to_date(date_string: str) -> datetime:

    if not date_string:
        return None
        
    # Liste des formats de date supportés
    date_formats = [
        '%Y-%m-%d',  # YYYY-MM-DD
        '%Y/%m/%d',  # YYYY/MM/DD
        '%d-%m-%Y',  # DD-MM-YYYY
        '%d/%m/%Y'   # DD/MM/YYYY
    ]
    
    # Essayer chaque format jusqu'à ce qu'un fonctionne
    for date_format in date_formats:
        try:
            return datetime.strptime(date_string, date_format)
        except ValueError:
            continue
            
    # Si aucun format n'a fonctionné, lever une exception
    raise ValueError(f"Format de date non reconnu pour : {date_string}. Les formats acceptés sont : YYYY-MM-DD, YYYY/MM/DD, DD-MM-YYYY, DD/MM/YYYY")
