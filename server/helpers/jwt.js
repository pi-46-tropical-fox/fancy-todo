"use strict";

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const generate_jwt_token = obj => {
	return jwt.sign(obj, secret);
}

const verify_jwt_token = token => {
	return jwt.verify(token, secret);
}

module.exports = { generate_jwt_token, verify_jwt_token };