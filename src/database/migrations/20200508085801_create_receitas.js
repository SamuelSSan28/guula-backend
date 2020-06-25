
exports.up = function(knex) {
    return knex.schema.createTable('receitas', function (table){
      table.increments();
      table.string('titulo').notNullable();
      table.string('categoria').notNullable();
      table.string('tempo_preparo').notNullable();
      table.string('rendimento').notNullable();
      table.string('ingredientes').notNullable();
      table.string('modo_preparo').notNullable();
	  table.string('dificuldade').notNullable();
      table.string('imagem').notNullable();

    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('receitas');
  };