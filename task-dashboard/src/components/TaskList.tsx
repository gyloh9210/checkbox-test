import { useGetTasksQuery } from "../api/task";
import { ITask } from "../types/task";
import Task from "./Task";

const TaskList = () => {
  const { data } = useGetTasksQuery();

  return (
    <div>
      <h2 className="text-center p-0 m-0">Task List</h2>
      {data?.tasks.map((task: ITask) => (
        <Task key={task.id} data={task} />
      ))}
    </div>
  );
};

export default TaskList;

/**
 * todo: 
 * TaskList
 * - search
 * - sort
 * - pagination
 *
 * Task
 * - edit
 * - delete
 */
