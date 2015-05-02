# Backbone Facebook Login

A small backbone.js helper to make login with Facebook API.


## Dependencies

* Backbone

## How to use

* Download the library
* Require the library (CommonJS, AMD and Browser ready)
* Pass in credentials your Facebook App ID
* You're ready!

## How to make a login

```javascript
var FBLogin = require('backbone-facebook-login') // Can be AMD or Browser-in too

var fbLogin = new FBLogin({
		credentials: {
			appId: 'xxxx' // Your Facebook App Id
		}
	}
});

fbLogin.init(); // Initialize the SDK

fbLogin.login(); // Make user login request
```

With scope
```javascript
var FBLogin = require('backbone-facebook-login') // Can be AMD or Browser-in too

var fbLogin = new FBLogin({
		credentials: {
			appId: 'xxxx' // Your Facebook App Id
		}
	}
});

fbLogin.init(); // Initialize the SDK

fbLogin.login({
	scope: 'public_profile, email, user_education_history'
}));
```

## How to get user data

With your SDK initialized (step above)

```javascript
fbLogin.getUserData('/me', 'user'); // User is the name that will appear in the object

fbLogin.getUserData('/me/picture', 'image', {width: 320; height: 320}); // A third parameter can be passed (Graph API options)
```

## How to logout

```javascript
fbLogin.logout();
```


Enjoy :)
