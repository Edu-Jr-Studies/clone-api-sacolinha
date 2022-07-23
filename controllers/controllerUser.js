const knex = require("../db/dbConfig");
const bcrypt = require("bcrypt");

const { attachPaginate } = require("knex-paginate");
attachPaginate();

class controllerUser {
  async create(req, res) {
    const { body } = req;

    try {
      if (!body.name || !body.email) {
        return res
          .status(400)
          .json({ status: "ERROR", msg: "Verifique se a campo vazio!" });
      }

      const pass = await bcrypt.hashSync(body.password, 10);

      const user = await knex("users").where("email", body.email);

      if (user.length === 1 && user[0].email === body.email) {
        return res
          .status(400)
          .json({ status: "ERROR", msg: "Email já cadastrado" });
      }

      const data = {
        name: body.name,
        email: body.email,
        address: body.address,
        phone: body.phone,
        password: pass,
        type: "user",
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
        phone: body.phone,
        shopping: body.shopping,
        photo: body.photo,
        needToUpdate: false,
        updateAt: new Date().toISOString(),
      };

      await knex("users").where("id", params.id).update(data);

      res.status(200).json({ status: "OK" });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async getAll(req, res) {
    const { query } = req;

    try {
      const users = await knex
        .select()
        .table("users")
        .select("id", "name", "email", "status", "type", "phone")
        .where({ isJoining: false })
        .paginate({
          perPage: query.perPage ? query.perPage : 20,
          currentPage: query.currentPage ? query.currentPage : 1,
        });

      res.status(200).json({ status: "OK", users });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async getOne(req, res) {
    const { params } = req;

    try {
      if (!params.id) {
        return res
          .status(404)
          .json({ status: "ERROR", msg: "É necessário informar o nome" });
      }

      const data = await knex("users")
        .where("id", params.id)
        .select(
          "name",
          "phone",
          "address",
          "shopping",
          "photo",
          "needToUpdate"
        );

      if (data.length === 0) {
        return res
          .status(404)
          .json({ status: "ERROR", msg: "User não encontrado" });
      }

      res.status(200).json({ status: "OK", data: data[0] });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async delete(req, res) {
    const { params } = req;

    try {
      if (params.id === "1" || params.id === "2") {
        return res
          .status(400)
          .json({ status: "ERROR", msg: "Usuário não pode ser removido" });
      }

      const result = await knex("users").where("id", params.id).del();

      if (result === 0) {
        return res.status(404).json({ status: "ERROR", msg: "Id não existe" });
      }

      res.status(200).json({ status: "OK" });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async getUserLogged(req, res) {
    const { userId } = req;

    try {
      const user = await knex("users").where("id", userId);

      if (user.length === 0) {
        return res
          .status(404)
          .json({ status: "ERROR", msg: "User não encontrado" });
      }

      res.status(200).json({ status: "OK", user: user[0] });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async setPasswordLoggedUser(req, res) {
    const { body, userId } = req;

    try {
      const pass = await bcrypt.hashSync(body.password, 10);

      await knex("users").where("id", userId).update({ password: pass });

      res.status(200).json({ status: "OK" });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }
}

module.exports = new controllerUser();
