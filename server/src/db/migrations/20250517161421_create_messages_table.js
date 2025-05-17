/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tblMessages', table => {
    table.increments('intMessageId').primary();
    table.integer('intSenderId').unsigned().notNullable();
    table.integer('intReceiverId').unsigned().notNullable();
    table.text('strContent').notNullable();
    table.boolean('bitIsRead').defaultTo(false);
    table.timestamps(true,true);

    // Foreign Key Constraint
    table.foreign('intSenderId').references('intId').inTable('tblUsers').onDelete('CASCADE');
    table.foreign('intReceiverId').references('intId').inTable('tblUsers').onDelete('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tblMessages');
};
