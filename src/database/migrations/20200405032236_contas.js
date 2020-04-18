exports.up = function(knex) {
	return knex.schema.createTable('contas', (table) => {
        table.increments();
        table.string('login', 12).notNullable();
        table.string('senha', 12).notNullable();
        table.string('email').notNullable();
        table.string('pergunta').notNullable();
        table.string('resposta').notNullable();
        table.timestamps('created_at', { useTz: true });
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('contas');
};
