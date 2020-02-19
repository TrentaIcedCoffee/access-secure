import requests
from flask import request, abort

class AccessSecureConfigError(Exception):
  def __init__(self, message):
    super().__init__(message)

class ACSecure:
  ENDPOINT = 'https://api.logsecure.io/'

  @staticmethod
  def ipOf(request):
    xForwardedFor = request.environ.get('HTTP_X_FORWARDED_FOR')
    if xForwardedFor:
      ip = xForwardedFor.split(',')[0]
    else:
      ip = request.remote_addr
    return ip

  def __init__(self, app):
    self.checkConfig(app)
    self.app = app
    self.appId = app.config['ACSECURE_APP_ID']
    self.token = app.config['ACSECURE_APP_TOKEN']
    self.app.before_request(self.middleware)

  def checkConfig(self, app):
    if not app:
      raise AccessSecureConfigError('app cannot be None')
    elif 'ACSECURE_APP_ID' not in app.config:
      raise AccessSecureConfigError('app config missing ACSECURE_APP_ID')
    elif 'ACSECURE_APP_TOKEN' not in app.config:
      raise AccessSecureConfigError('app config missing ACSECURE_APP_TOKEN')

  def middleware(self):
    r = requests.post(
      ACSecure.ENDPOINT,
      json={
        'log': {
          'ip': ACSecure.ipOf(request),
          'method': request.method,
          'path': request.path,
        },
        'appId': self.appId,
        'token': self.token,
      },
      headers={
        'Content-type': 'application/json'
      },
    )

    res = r.json()
    if res['statusCode'] != 200:
      raise AccessSecureConfigError(res['body']['msg'])
    elif res['body']['isBlocked']:
      abort(403)