import knex from "knex";
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

  async getTotal(keyword: string) {
    return await db("tasks")
      .count("id as count")
      .where("name", "like", `%${keyword}%`)
      .first();
  }

  async getAll({
    page,
    limit,
    keyword,
    sortBy,
    order,
  }: {
    page: number;
    limit: number;
    keyword: string;
    sortBy: string;
    order: string;
  }) {
    const tasks = await db("tasks")
      .select("*")
      .limit(limit)
      .orderBy(sortBy, order)
      .where("name", "like", `%${keyword}%`)
      .offset(page * limit - limit);
    const total = await this.getTotal(keyword);

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

  async delete(id: string) {
    return db("tasks").where({ id }).delete();
  }
}

export default Task;
