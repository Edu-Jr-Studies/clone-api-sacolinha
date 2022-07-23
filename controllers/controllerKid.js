const { from } = require('../db/dbConfig');
const knex = require("../db/dbConfig");
const Utils = require('../utils');
const { writeFileSync } = require('fs');
const path = require('path');

class controllerKid {
  async create(req, res) {
    const { body } = req;

    try {
      const data = {
        name: body.name,
        mother: body.mother,
        city: body.city,
        state: body.state,
        birthDate: body.birthDate,
        sizeShoe: body.sizeShoe,
        sizeShirt: body.sizeShirt,
        sizePants: body.sizePants,
        photo: body.photo,
        isJoining: "0",
        createdAt: new Date().toISOString(),
      };

      await knex("kids").insert(data);

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
        mother: body.mother,
        city: body.city,
        state: body.state,
        birthDate: body.birthDate,
        sizeShoe: body.sizeShoe,
        sizeShirt: body.sizeShirt,
        sizePants: body.sizePants,
        photo: body.photo
      };

      const result = await knex("kids").where("id", params.id).update(data);

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
    const { query } = req;

    try {
      const kids = await knex
        .select("id", "name")
        .table("kids")
        .where({ isJoining: query.isOrphan === "false" ? true : false });

      res.status(200).json({ status: "OK", kids });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async getOne(req, res) {
    const { params } = req;

    try {
      const kid = await knex("kids").where("id", params.id);

      if (kid.length === 0) {
        return res
          .status(400)
          .json({ status: "ERROR", msg: "Não encontrado." });
      }

      res.status(200).json({ status: "OK", kid: kid[0] });
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }
  }

  async delete(req, res) {
    const { params } = req;

    try {
      const result = await knex("kids").where("id", params.id).del();

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

  async kidTag(req, res) {
    const { body } = req;

    try {
      const kids = await knex
      .select(
        "id",
        "name",
        "city",
        "state",
        "mother",
        "birthDate",
        "sizeShirt",
        "sizeShoe",
        "sizePants",
      )
      .table("kids")
      .whereIn("id", body.id)
      .whereNot('isPrinted', true)
      
/*      
      let result = [];

      for(let i of kids){
        let func = await Utils.handleCreatePdf({
          id: i.id,
          name: i.name,
          city: i.city,
          state: i.state,
          mother: i.mother,
          birthDate: i.birthDate,
          sizeShirt: i.sizeShirt,
          sizeShoe: i.sizeShoe,
          sizePant: i.sizePant,
        });
        result.push(JSON.stringify([...func]));
      }


      res.status(200).json({ status: 'ok', res: result});
*/

      for(let i of kids){
        let func = await Utils.handleCreatePdf({
          id: i.id,
          name: i.name,
          city: i.city,
          state: i.state,
          mother: i.mother,
          birthDate: i.birthDate,
          sizeShirt: i.sizeShirt,
          sizeShoe: i.sizeShoe,
          sizePant: i.sizePant,
        });
        
        writeFileSync(`${__dirname}/../uploads/files/${i.id}_kid_${new Date()}.pdf`, func);
      }

      res.status(200).json({ status: 'ok'});
    } catch (e) {
      console.log(e);

      res.status(400).json({ status: "ERROR" });
    }

  }
  
}

module.exports = new controllerKid();
