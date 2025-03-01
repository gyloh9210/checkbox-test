import { Knex } from "knex";
import { faker } from "@faker-js/faker";

interface ITask {
  name: string;
  description: string;
  due_date: Date;
  is_urgent: boolean;
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("tasks").del();

  const tasks: ITask[] = [];

  for (let i = 0; i < 50000; i++) {
    tasks.push({
      name: faker.lorem.sentence({ min: 5, max: 15 }),
      description: faker.lorem.paragraphs({ min: 1, max: 5 }),
      due_date: faker.date.between({
        from: new Date(2025, 1, 1),
        to: new Date(2025, 3, 30),
      }),
      is_urgent: i % 3 === 0,
    });
  }

  await knex.batchInsert("tasks", tasks, 1000);
}
