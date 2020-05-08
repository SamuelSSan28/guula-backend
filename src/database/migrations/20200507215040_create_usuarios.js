
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function (table){
      table.increments();
      table.string('nome').notNullable();
      table.string('senha').notNullable();
      table.string('email').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
  };
