import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useStoreOrUpdateTaskMutation } from "../api/task";
import { ChangeEvent, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { useToast } from "../context/ToastContext";

type TaskFormProps = {
  onClose: () => void;
  id?: string;
  dueDate?: Date;
  name?: string;
  description?: string;
};

const TaskForm = ({
  onClose,
  id,
  dueDate,
  name,
  description,
}: TaskFormProps) => {
  const { mutateAsync: saveTask } = useStoreOrUpdateTaskMutation();
  const [newName, setName] = useState<string>(name ?? "");
  const [newDescription, setDescription] = useState<string>(description ?? "");
  const [newDueDate, setDueDate] = useState<Date | null>(dueDate ?? new Date());
  const { showToast } = useToast();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSaveTask = async () => {
    await saveTask({
      id,
      name: newName,
      description: newDescription,
      dueDate: moment(newDueDate).format("YYYY-MM-DD"),
    });
    showToast("Saved successfully", "success");
    onClose();
  };

  const renderFooter = () => {
    return (
      <>
        <Button
          label="Save"
          severity="success"
          disabled={!newName || !newDescription || !newDueDate}
          onClick={handleSaveTask}
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
          value={newName}
          onChange={handleNameChange}
          placeholder="Task name"
          className="w-full"
        />
      </div>

      <div className="block mb-2">
        <InputTextarea
          value={newDescription}
          placeholder="Task description"
          onChange={handleDescriptionChange}
          className="w-full"
        />
      </div>

      <div className="blok mb-2">
        <Calendar
          placeholder="Due date"
          dateFormat="dd/mm/yy"
          value={newDueDate}
          onChange={(e) => setDueDate(e.target.value as Date)}
        />
      </div>
    </Card>
  );
};

export default TaskForm;
