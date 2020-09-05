// const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

function validatePassword(password) {
	if (password.length < 8) {
		throw new Error('Password must be more than 8 characters');
	}

	return true;
}

function validateUsername(username) {
	if (!usernameRegex.test(username)) {
		throw new Error('Username must not contain commas or spaces!');
	}
}

function validateEmail(email) {
	if (!emailRegex.test(email)) {
		throw new Error('Invalid Email');
	}

	return true;
}

module.exports = { validatePassword, validateEmail, validateUsername };
