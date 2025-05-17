/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tblUsers', table => {
    table.increments('intId').primary();
    table.string('strUsername').notNullable().unique();
    table.string('strEmail').notNullable().unique();
    table.string('strPassword').notNullable();
    table.string('strProfilePicLink').notNullable();
    table.timestamps(true,true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tblUsers')
};
