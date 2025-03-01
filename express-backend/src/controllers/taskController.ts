import { Request, Response } from "express";
import * as yup from "yup";
import Task from "../model/Task";

// Define the validation schema using yup
const taskSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  due_date: yup.date().required(),
});

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    await taskSchema.validate(req.body);

    const taskModel = new Task();

    const task = await taskModel.create({
      name: req.body.name,
      description: req.body.description,
      dueDate: req.body.due_date,
    });

    res.status(201).json({ task });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = 100;
    
    const taskModel = new Task();

    const { tasks, total } = await taskModel.getAll({ page, limit });

    res.status(200).json({
      tasks,
      page,
      limit,
      total,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
