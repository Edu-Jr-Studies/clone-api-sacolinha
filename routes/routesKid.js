var express = require("express");
var routesKid = express.Router();
var controllerKid = require("../controllers/controllerKid");

const auth = require("../auth");

routesKid.patch("/:id", auth, controllerKid.update);
routesKid.get("/:id", auth, controllerKid.getOne);
routesKid.delete("/:id", auth, controllerKid.delete);
routesKid.get("/", auth, controllerKid.getAll);
routesKid.post("/", auth, controllerKid.create);
//rota em teste ainda
routesKid.post("/kidTag", controllerKid.kidTag);

module.exports = routesKid;
