
exports.up = function(knex) {
    return knex.schema.createTable('receitas_usuarios', function (table){
      table.increments();
      table.string('usuario_id').notNullable();
      table.string('receita_id').notNullable();

      table.foreign('usuario_id').references('id').inTable('usuarios');
      table.foreign('receita_id').references('id').inTable('receitas');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('receitas_usuarios');
  };