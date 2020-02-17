![npm](https://img.shields.io/npm/v/express-acsecure)

# express-acsecure

Access Secure middleware for Express (node), for logging, anti-spamming and black/white list...

## Install

 - Go to [https://logsecure.io](https://www.logsecure.io/), create an account and project. Remember project ID and keep project token in secret. (See [images below for details](#images))
 -     npm i express-acsecure
 - Usage   
 
	```js
	app.use(bodyParser.json()); // Optional, to record request body

	const acsecure = require('express-acsecure');

	const appId = 'myAppId';
	const appToken = 'myAppToken';
	const forbiddenCallback = res => res.status(403).end(); // callback for forbidden requests
	
	app.use(acsecure(appId, appToken, forbiddenCallback));
	```

## Images
### register    
<img alt="register.JPG" src="https://raw.githubusercontent.com/TrentaIcedCoffee/access-secure/master/images/register.JPG" width="600" />    

### create project    
<img alt="create-project.JPG" src="https://raw.githubusercontent.com/TrentaIcedCoffee/access-secure/master/images/create-project.JPG" width="600" />    

### project ID and Token    
<img alt="console.JPG" src="https://raw.githubusercontent.com/TrentaIcedCoffee/access-secure/master/images/console.JPG" width="600" />    
