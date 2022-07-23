const knex = require("../db/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class controllerLogin {
  async login(req, res) {
    const { body } = req;

    try {
      let user = "";

      if (body.email) {
        user = await knex("users").where("email", body.email);
      }

      if (user.length === 0) {
        const name = body.email.split("@")[0];

        const pass = await bcrypt.hashSync(name + "10", 10);

        const data = {
          name: name,
          email: body.email,
          address: "",
          phone: "",
          password: pass,
          type: "user",
          status: "active",
          isJoining: 0,
          manualRegistration: false,
          needToUpdate: true,
          createdAt: new Date().toISOString(),
        };

        await knex("users").insert(data);

        user = await knex("users").where("email", body.email);
      }

      if (user[0].status === "inactive") {
        return res
          .status(401)
          .json({ status: "ERROR", msg: "Usuário ou senha incorreto!" });
      }

      if (!body.isMobile) {
        var match = bcrypt.compareSync(body.password, user[0].password);

        if (!match) {
          return res
            .status(401)
            .json({ status: "ERROR", msg: "Usuário ou senha incorreto!" });
        }
      }

      jwt.sign(
        { id: user[0].id, type: user[0].type },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: "600h" },
        (err, token) => {
          if (err) {
            return res
              .status(400)
              .json({ status: "ERROR", msg: "no Servidor" });
          } else {
            if (body.isMobile) {
              return res
                .status(200)
                .json({
                  status: "OK",
                  token: token,
                  type: user[0].type,
                  id: user[0].id,
                  needToUpdate: user[0].needToUpdate === "1" ? true : false,
                });
            } else {
              return res.status(200).json({ status: "OK", token: token });
            }
          }
        }
      );
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }
}

module.exports = new controllerLogin();
