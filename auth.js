const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    if (req.headers.authorization === undefined) {
      return res.status(401).json({ status: "ERROR", msg: "Unauthorized1" });
    }

    const token = req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ status: "ERROR", msg: "Unauthorized2" });
      } else {
        req.userId = decoded.id;
      }
    });

    next();
  } catch (err) {
    console.log(err);
  }
}

module.exports = auth;
