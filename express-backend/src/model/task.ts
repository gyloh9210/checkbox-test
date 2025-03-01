import knex, { Knex } from "knex";
import config from "../knexfile";

// Initialize Knex with configuration
const db = knex(config.development);

class Task {
  async create({
    name,
    description,
    dueDate,
  }: {
    name: string;
    description: string;
    dueDate: Date;
  }) {
    return db("tasks").insert(
      {
        name,
        description,
        due_date: dueDate,
      },
      ["id", "name", "description", "due_date"]
    );
  }

  async getTotal() {
    return await db("tasks").count("id as count").first();
  }

  async getAll({ page, limit }: { page: number; limit: number }) {
    const tasks = await db("tasks")
      .select("*")
      .limit(limit)
      .offset(page * limit - limit);
    const total = await this.getTotal();

    return {
      tasks,
      total: total?.count,
    };
  }

  async get(id: string) {
    return db("tasks").where({ id }).first();
  }

  async update({
    id,
    name,
    description,
    dueDate,
  }: {
    id: string;
    name: string;
    description: string;
    dueDate: Date;
  }) {
    return db("tasks").where({ id }).update(
      {
        name,
        description,
        due_date: dueDate,
      },
      ["id", "name", "description", "due_date"]
    );
  }
}

export default Task;
