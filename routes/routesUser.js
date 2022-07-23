var express = require("express");
var routesUser = express.Router();
var controllerUser = require("../controllers/controllerUser");

var auth = require("../auth")

routesUser.get("/get-logged-user", auth, controllerUser.getUserLogged);
routesUser.post("/set-password-logged-user", auth, controllerUser.setPasswordLoggedUser);

routesUser.patch("/:id", auth, controllerUser.update);
routesUser.get("/:id", auth, controllerUser.getOne);
routesUser.delete("/:id", auth, controllerUser.delete);
routesUser.get("/", auth, controllerUser.getAll);
routesUser.post("/",  controllerUser.create);

module.exports = routesUser;