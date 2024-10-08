import logging
from logging.handlers import RotatingFileHandler

class LogManager:

    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(LogManager, cls).__new__(cls)
        return cls.instance
    def __init__(self, name: str, log_file: str = None, level: int = logging.INFO):
        """
        Initialise un LogManager avec le nom donné et la configuration du fichier de log.
        :param name: Le nom du logger (généralement __name__)
        :param log_file: Chemin vers le fichier de log, si fourni
        :param level: Niveau de log, par défaut INFO
        """
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level)

        # Format des messages de log
        log_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

        # Handler pour afficher les logs dans la console
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(log_format)
        self.logger.addHandler(console_handler)

        # Si un fichier de log est fourni, ajouter un handler pour enregistrer les logs dans ce fichier
        if log_file:
            # Utilise un RotatingFileHandler pour gérer les fichiers de log volumineux
            file_handler = RotatingFileHandler(log_file, maxBytes=5*1024*1024, backupCount=2)  # Max 5 MB, 2 sauvegardes
            file_handler.setFormatter(log_format)
            self.logger.addHandler(file_handler)

    def get_logger(self):
        """Retourne le logger configuré."""
        return self.logger