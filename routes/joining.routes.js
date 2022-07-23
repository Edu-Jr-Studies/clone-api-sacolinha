var express = require("express");
var routesJoining = express.Router();
var controllerJoining = require("../controllers/joining");

const auth = require("../auth");

routesJoining.post("/", auth, controllerJoining.joining);
routesJoining.get("/", auth, controllerJoining.get);
routesJoining.get(
  "/godmother-of-the-kid/:kidId",
  auth,
  controllerJoining.getGodmotherOfTheKid
);
routesJoining.patch(
  "/release-kid-for-adoption/:kidId",
  auth,
  controllerJoining.releaseKidForAdoption
);

// routesJoining.patch("/:id", auth, controllerJoining.update);
// routesJoining.get("/:id", auth, controllerJoining.getOne);
// routesJoining.delete("/:id", auth, controllerJoining.delete);

module.exports = routesJoining;
