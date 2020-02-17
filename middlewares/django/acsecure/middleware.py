import requests

from django.core.exceptions import PermissionDenied
from django.conf import settings

ENDPOINT = 'https://api.logsecure.io/'

def ipOf(request):
  xForwardedFor = request.META.get('HTTP_X_FORWARDED_FOR')
  if xForwardedFor:
    ip = xForwardedFor.split(',')[0]
  else:
    ip = request.META.get('REMOTE_ADDR')
  return ip

class AccessSecureConfigError(Exception):
  def __init__(self, message):
    super().__init__(message)

if not settings.ACCESS_SECURE_APPID:
  raise AccessSecureConfigError('ACCESS_SECURE_APPID missing from settings')
elif not settings.ACCESS_SECURE_TOKEN:
  raise AccessSecureConfigError('ACCESS_SECURE_TOKEN missing from settings')

class AccessSecureMiddleware:

  def __init__(self, get_response):
    self.get_response = get_response

  def __call__(self, request):
    log = {
      'ip': ipOf(request),
      'method': request.method,
      'path': request.path,
      'body': request.POST,
      'params': request.GET,
    }

    r = requests.post(
      ENDPOINT,
      json={
        'log': log,
        'appId': settings.ACCESS_SECURE_APPID,
        'token': settings.ACCESS_SECURE_TOKEN,
      },
      headers={
        'Content-type': 'application/json'
      },
    )

    res = r.json()
    if res['statusCode'] != 200:
      raise AccessSecureConfigError(res['body']['msg'])
    elif res['body']['isBlocked']:
      raise PermissionDenied

    return self.get_response(request)