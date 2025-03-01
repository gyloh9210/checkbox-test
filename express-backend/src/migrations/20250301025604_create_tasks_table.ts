import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tasks", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()")); // UUID primary key
    table.text("name").notNullable();
    table.text("description").notNullable();
    table.date("due_date").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tasks");
}