var express = require("express");
var routesLogin = express.Router();
var controllerLogin = require("../controllers/controllerLogin");

var auth = require("../auth")

routesLogin.post("/", controllerLogin.login);

module.exports = routesLogin;