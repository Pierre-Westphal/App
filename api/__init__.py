import logging

from api.managers.log_manager import LogManager

LogManager(name=__name__, log_file='app.log', level=logging.DEBUG)
