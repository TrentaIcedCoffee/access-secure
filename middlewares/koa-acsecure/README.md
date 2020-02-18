# koa-acsecure

Access Secure middleware for Koa (node), for logging, anti-spamming and black/white list...

## Install

 - Go to [https://logsecure.io](https://www.logsecure.io/), create an account and project. Remember project ID and keep project token in secret. (See [images below for details](#images))
 -     npm i koa-acsecure
 - Usage   
 
	```js
	app.use(bodyParser()); // Optional, to record params, query and body
	
    const acsecure = require('koa-acsecure');
    
    app.use(acsecure('myAppId', 'myAppToken'));
	```

## Images
### register    
<img alt="register.JPG" src="https://raw.githubusercontent.com/TrentaIcedCoffee/access-secure/master/images/register.JPG" width="600" />    

### create project    
<img alt="create-project.JPG" src="https://raw.githubusercontent.com/TrentaIcedCoffee/access-secure/master/images/create-project.JPG" width="600" />    

### project ID and Token    
<img alt="console.JPG" src="https://raw.githubusercontent.com/TrentaIcedCoffee/access-secure/master/images/console.JPG" width="600" />    
