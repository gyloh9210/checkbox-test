import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useStoreTaskMutation } from "../api/task";
import { ChangeEvent, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { useToast } from "../context/ToastContext";

type TaskFormProps = {
  onClose: () => void;
};

const TaskForm = ({ onClose }: TaskFormProps) => {
  const { mutateAsync: createTask } = useStoreTaskMutation();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const { showToast } = useToast();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCreateTask = async () => {
    await createTask({
      name,
      description,
      dueDate: moment(dueDate).format("YYYY-MM-DD"),
    });
    showToast("Created successfully", "success");
    onClose();
  };

  const renderFooter = () => {
    return (
      <>
        <Button
          label="Save"
          severity="success"
          disabled={!name || !description || !dueDate}
          onClick={handleCreateTask}
        />
        <Button
          label="Cancel"
          severity="danger"
          style={{ marginLeft: "0.5em" }}
          onClick={onClose}
        />
      </>
    );
  };

  return (
    <Card
      footer={renderFooter}
      className="relative mb-2 shadow-md border-round-lg w-full"
    >
      <div className="block mb-2">
        <InputText
          value={name}
          onChange={handleNameChange}
          placeholder="Task name"
          className="w-full"
        />
      </div>

      <div className="block mb-2">
        <InputTextarea
          value={description}
          placeholder="Task description"
          onChange={handleDescriptionChange}
          className="w-full"
        />
      </div>

      <div className="blok mb-2">
        <Calendar
          placeholder="Due date"
          dateFormat="dd/mm/yy"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value as Date)}
        />
      </div>
    </Card>
  );
};

export default TaskForm;
