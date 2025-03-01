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
}

export default Task;
