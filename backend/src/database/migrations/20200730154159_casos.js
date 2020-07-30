exports.up = function(knex) {
    return knex.schema.createTable('casos', function (table) {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('raca').notNullable();
        
        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('user');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('casos');
};