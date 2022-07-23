
exports.up = function (knex) {
  return knex.schema.createTable('kids', table => {
    table.increments().primary()
    table.string('name', 200)
    table.string('city', 200)
    table.string('createdAt', 30)
    table.string('state', 5)
    table.string('mother', 200)
    table.string('birthDate', 30)
    table.string('sizeShirt', 5)
    table.string('sizeShoe', 5)
    table.string('sizePants', 5)
    table.string('isJoining', 5)
    table.string('isPrinted', 5)
    table.longText('photo')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('kids')
};