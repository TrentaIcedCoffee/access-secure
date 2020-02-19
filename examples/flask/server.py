from flask import Flask
from flask_acsecure import ACSecure

app = Flask(__name__)

app.config.update({
  'ACSECURE_APP_ID': 'my_app_id',
  'ACSECURE_APP_TOKEN': 'my_app_token',
})

ACSecure(app)

@app.errorhandler(403)
def forbidden(e):
  return { 'message': 'forbidden' }

@app.route('/')
def index():
  return { 'message': 'ok' }

if __name__ == '__main__':
  app.run(host='localhost', port=8080)