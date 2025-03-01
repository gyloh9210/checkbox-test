import express from "express";
import * as taskController from "./controllers/taskController";

const app = express();
app.use(express.json());

app.post("/tasks", taskController.createTask);
app.get("/tasks", taskController.getTasks);
app.get("/tasks/:id", taskController.getTaskById);
app.put("/tasks/:id", taskController.updateTask);
app.delete("/tasks/:id", taskController.deleteTask);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
