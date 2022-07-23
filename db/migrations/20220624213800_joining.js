exports.up = function (knex) {
  return knex.schema.createTable("joining", (table) => {
    table.increments().primary();
    table.integer("idGodmother", 10);
    table.integer("idKid", 10);
    table.string("createdAt", 30);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("joining");
};
