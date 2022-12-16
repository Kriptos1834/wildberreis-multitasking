import datetime
import logging
import os


logging.basicConfig(filename=os.path.join(os.path.dirname(os.path.realpath(__file__)), '..', 'error.log'),
                    level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s %(name)s %(message)s')


def get_logger():

    return logging.getLogger(__name__)


def cout(msg, filename):
    print(f'{datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")} {os.path.basename(filename)}: {msg}')


def log_errors(logger, filename):
    def decorator(func):
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                cout('[+] An ERROR occured. See details in logs.', filename)
                logger.error(e)
        return wrapper
    return decorator
