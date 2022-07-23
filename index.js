require("dotenv").config();
var express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

var app = express();

var routesLogin = require("./routes/routesLogin");
var routesKid = require("./routes/routesKid");
var routesGodmother = require("./routes/godmother.routes");
var routesUser = require("./routes/routesUser");
var routesJoining = require("./routes/joining.routes");

app.use(bodyParser.json({ limit: "9999kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/files", express.static(path.resolve(__dirname, "uploads", "images")));

app.use("/login", routesLogin);
app.use("/kid", routesKid);
app.use("/god-mother", routesGodmother);
app.use("/user", routesUser);
app.use("/joining", routesJoining);

app.get("/", (req, res) => {
  res.json({ api: "Api projeto sacola 01" });
});

app.listen(process.env.PORT || 8000);
