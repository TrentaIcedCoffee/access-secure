[![PyPI version](https://badge.fury.io/py/Flask-ACSecure.svg)](https://badge.fury.io/py/Flask-ACSecure)

# Flask-ACSecure

Access Secure middleware for Flask, for logging, anti-spamming and black/white list...

## Install

 - Go to [https://logsecure.io](https://www.logsecure.io/), create an account and project. Remember project ID and keep project token in secret. (See [images below for details](#images))
 -     pip install Flask-ACSecure
 - Config and Usage
 
	```python
	from flask_acsecure import ACSecure

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
	```

## Images
### register    
<img alt="register.JPG" src="https://raw.githubusercontent.com/TrentaIcedCoffee/access-secure/master/images/register.JPG" width="600" />    

### create project    
<img alt="create-project.JPG" src="https://raw.githubusercontent.com/TrentaIcedCoffee/access-secure/master/images/create-project.JPG" width="600" />    

### project ID and Token    
<img alt="console.JPG" src="https://raw.githubusercontent.com/TrentaIcedCoffee/access-secure/master/images/console.JPG" width="600" />    
