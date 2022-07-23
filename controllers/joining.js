const knex = require("../db/dbConfig");
class controllerJoining {
  async joining(req, res) {
    const { body } = req;

    try {
      const arrayKids = JSON.parse(body.kids);
      const arrayGooMothers = JSON.parse(body.godMothers);

      const process = async (kid, mother) => {
        const data = {
          idKid: kid,
          idGodmother: mother,
          createdAt: new Date().toISOString(),
        };
        await knex("joining").insert(data);

        await knex("kids").where({ id: kid }).update({ isJoining: true });
        await knex("users").where({ id: mother }).update({ isJoining: true });
      };

      arrayKids.map((kid) => {
        arrayGooMothers.map((mother) => {
          process(kid, mother);
        });
      });

      res.status(200).json({ status: "OK" });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async get(req, res) {
    const { userId } = req;

    try {
      const user = await knex("users").where({ id: userId });

      if (user[0].type === "admin") {
        return res.status(400).json({ status: "ERROR", msg: "Não é madrinha" });
      }

      const data = await knex("joining")
        .where({ idGodmother: userId })
        .join("kids", "joining.idKid", "=", "kids.id")
        .select("kids.id as id", "kids.name as name", "kids.photo as photo");

      res.status(200).json({ status: "OK", dataRes: data });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async getGodmotherOfTheKid(req, res) {
    const { params } = req;

    try {
      const data = await knex("joining")
        .where({ idKid: params.kidId })
        .join("users", "joining.idGodmother", "=", "users.id")
        .select("users.id as id", "users.name as name");

      res.status(200).json({ status: "OK", dataRes: data });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async releaseKidForAdoption(req, res) {
    const { params } = req;

    try {
      const data = await knex("joining")
        .where({ idKid: params.kidId })
        .join("users", "joining.idGodmother", "=", "users.id")
        .select("users.id as idGodMother");

      const resetGodmother = async (id) => {
        await knex("joining")
          .where({ idKid: params.kidId, idGodmother: id })
          .del();

        const data = await knex("joining").where({ idGodmother: id });

        if (data.length === 0) {
          await knex("users").where({ id: id }).update({ isJoining: false });
        }
      };

      await knex("kids")
        .where({ id: params.kidId })
        .update({ isJoining: false });

      await data.map((item) => resetGodmother(item.idGodMother));

      res.status(200).json({ status: "OK" });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }
}

module.exports = new controllerJoining();
