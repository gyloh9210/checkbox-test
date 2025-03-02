import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { ITask } from "../types/task";
import { Button } from "primereact/button";
import moment from "moment";
import { useToast } from "../context/ToastContext";
import { useDeleteTaskMutation } from "../api/task";
import { useState } from "react";
import TaskForm from "./TaskForm";

const renderDateTag = (dueDate: string) => {
  const displayDate = moment(dueDate).format("YYYY-MM-DD");
  const isDueSoon = moment(dueDate).isBefore(moment().add(7, "days"));
  const isOverdue = moment(dueDate).isBefore(moment());

  if (isOverdue) {
    return <Tag severity="danger">Overdue: {displayDate}</Tag>;
  }

  if (isDueSoon) {
    return <Tag severity="warning">Due Soon: {displayDate}</Tag>;
  }

  return <Tag severity="info">Due on: {displayDate}</Tag>;
};

const Task = ({ data }: { data: ITask }) => {
  const { showToast } = useToast();
  const { mutateAsync: deleteTask } = useDeleteTaskMutation();
  const [editing, setEditing] = useState<boolean>(false);

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    showToast("Deleted successfully", "success");
  };

  const handleEditTask = () => {
    setEditing(true);
  };

  const handleCloseTask = () => {
    setEditing(false);
  };

  return editing ? (
    <TaskForm
      id={data.id}
      description={data.description}
      name={data.name}
      dueDate={new Date(data.due_date)}
      onClose={handleCloseTask}
    />
  ) : (
    <Card className="relative mb-2 shadow-md border-50 surface-overlay border-1 border-round-lg w-full">
      <div className="absolute top-10 right-0 mr-2">
        <Button
          className="mr-2"
          icon="pi pi-pencil"
          severity="warning"
          onClick={() => handleEditTask()}
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          onClick={() => handleDeleteTask(data.id)}
        />
      </div>
      <div className="flex justify-between align-items-center">
        <h2 className="text-xl font-semibold">{data.name}</h2>
      </div>

      <div className="block">{renderDateTag(data.due_date)}</div>

      <p className="text-gray-600">{data.description}</p>

      <div className="flex flex-column justify-between mt-3">
        <div className="block">
          <span className="font-bold">Created: </span>
          <span
            className="text-gray-500 created_date"
            title={moment(data.created_at).format("YYYY-MM-DD HH:mm:ss")}
          >
            {moment(data.created_at).fromNow()}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default Task;
