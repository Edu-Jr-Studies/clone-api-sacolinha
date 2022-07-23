exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments().primary();
    table.string("name", 200);
    table.string("password", 200);
    table.string("email", 200);
    table.string("phone", 50);
    table.string("address", 1000);
    table.string("shopping", 100);
    table.longText('photo')
    table.string("needToUpdate", 5);
    table.string('isJoining', 5)
    table.string('manualRegistration', 5)
    table.enu("type", ["admin", "user"]);
    table.enu("status", ["active", "inactive"]);
    table.string("createdAt", 30);
    table.string("updateAt", 30);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
