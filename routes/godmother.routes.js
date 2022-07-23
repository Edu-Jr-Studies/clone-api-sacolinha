var express = require("express");
var routesGodmother = express.Router();
var controllerGodmother = require("../controllers/godmother");

const auth = require("../auth");

routesGodmother.patch("/:id", auth, controllerGodmother.update);
routesGodmother.get("/:id", auth, controllerGodmother.getOne);
routesGodmother.delete("/:id", auth, controllerGodmother.delete);
routesGodmother.get("/", auth, controllerGodmother.getAll);
routesGodmother.post("/", auth, controllerGodmother.create);

module.exports = routesGodmother;
