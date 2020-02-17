[![PyPI version](https://badge.fury.io/py/django-acsecure.svg)](https://badge.fury.io/py/django-acsecure)

# django-acsecure

Access Secure middleware for Django, for logging, anti-spamming and black/white list...

## Install

 - Go to [https://logsecure.io](https://www.logsecure.io/), create an account and project. Remember project ID and keep project token in secret. (See [images below for details](#images))
 -     pip install django-acsecure
 - In `settings.py`, put your project ID and Token, and put middleware in `MIDDLEWARE`    
 
	```python
	ACCESS_SECURE_APPID = 'my-app-id'
    ACCESS_SECURE_TOKEN = 'my-app-token'
    
    MIDDLEWARE = [
	    'django.middleware.security.SecurityMiddleware',
	    'django.contrib.sessions.middleware.SessionMiddleware',
	    ...
	    'acsecure.middleware.AccessSecureMiddleware',
	]
	```

## Images
### register    
<img alt="register.JPG" src="https://raw.githubusercontent.com/TrentaIcedCoffee/access-secure/master/images/register.JPG" width="600" />    

### create project    
<img alt="create-project.JPG" src="https://raw.githubusercontent.com/TrentaIcedCoffee/access-secure/master/images/create-project.JPG" width="600" />    

### project ID and Token    
<img alt="console.JPG" src="https://raw.githubusercontent.com/TrentaIcedCoffee/access-secure/master/images/console.JPG" width="600" />    
