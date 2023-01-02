# -*- coding: utf8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse

import logging
import sys
import traceback


LOGGER = logging.getLogger('error')


class ExceptionLoggingMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)
    """
    This middleware provides logging of exception in requests.
    """

    def process_exception(self, request, exception):
        """
        Processes exceptions during handling of a http request.
        Logs them with *ERROR* level.
        """
        _, _, stacktrace = sys.exc_info()
        LOGGER.error(
            """Processing exception %s at %s.
            GET %s
            Traceback %s""",
            exception, request.path, request.GET,
            ''.join(traceback.format_tb(stacktrace)))
        return None
