const knex = require("../db/dbConfig");
const bcrypt = require("bcrypt");

class controllerGodmother {
  async create(req, res) {
    const { body } = req;

    try {
      const user = await knex("users").where("email", body.email);

      if (user.length > 0) {
        return res
          .status(400)
          .json({
            status: "ERROR",
            msg: "Este e-mail já está utilizado em algum cadastro",
          });
      }

      const pass = await bcrypt.hashSync(body.name + "10", 10);

      const data = {
        name: body.name,
        password: pass,
        email: body.email,
        shopping: body.shopping,
        photo: body.photo,
        phone: body.phone,
        type: "user",
        status: "active",
        manualRegistration: true,
        needToUpdate: true,
        isJoining: false,
        createdAt: new Date().toISOString(),
      };

      await knex("users").insert(data);

      res.status(200).json({ status: "OK" });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async update(req, res) {
    const { body, params } = req;

    try {
      const data = {
        name: body.name,
        email: body.email,
        shopping: body.shopping,
        photo: body.photo,
        phone: body.phone,
        updateAt: new Date().toISOString(),
      };

      const result = await knex("users").where({ id: params.id }).update(data);

      if (result === 0) {
        return res.status(400).json({
          status: "ERROR",
          msg: "Não encontrado.",
        });
      }

      res.status(200).json({ status: "OK" });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async getAll(req, res) {
    try {
      const dataRes = await knex
        .select("id", "name", "phone", "shopping", "photo")
        .table("users")
        .where({ type: "user", isJoining: false });

      res.status(200).json({ status: "OK", dataRes });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async getOne(req, res) {
    const { params } = req;

    try {
      const dataRes = await knex("users").where({
        id: params.id,
        type: "user",
      });

      if (dataRes.length === 0) {
        return res
          .status(400)
          .json({ status: "ERROR", msg: "Não encontrado." });
      }

      res.status(200).json({ status: "OK", dataRes: dataRes[0] });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async delete(req, res) {
    const { params } = req;

    try {
      const result = await knex("users").where("id", params.id).del();

      if (result === 0) {
        return res.status(404).json({
          status: "ERROR",
          msg: "Não encontrado.",
        });
      }

      res.status(200).json({ status: "OK" });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }
}

module.exports = new controllerGodmother();
