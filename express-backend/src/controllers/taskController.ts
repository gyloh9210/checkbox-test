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
    const keyword = req.query?.keyword ?? "";
    const sortBy = req.query?.sortBy ?? "created_at";
    const order = req.query?.order ?? "desc";

    const taskModel = new Task();

    const { tasks, total } = await taskModel.getAll({
      page,
      limit,
      keyword: keyword as string,
      sortBy: sortBy as string,
      order: order as string,
    });

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

// Get a single task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const taskModel = new Task();

    const task = await taskModel.get(req.params.id);

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a task by ID
export const updateTask = async (req: Request, res: Response) => {
  try {
    await taskSchema.validate(req.body);

    const taskModel = new Task();

    const updated = await taskModel.update({
      id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      dueDate: req.body.due_date,
    });

    if (!updated) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updated[0] });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Delete a task by ID
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskModel = new Task();

    const deleted = await taskModel.delete(req.params.id);

    if (!deleted) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
