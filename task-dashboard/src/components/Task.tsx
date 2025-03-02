import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { ITask } from "../types/task";
import moment from "moment";

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
  return (
    <Card className="mb-2 shadow-md border-round-lg w-full">
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
