import { useState } from "react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useGetTasksQuery } from "../api/task";
import { ITask } from "../types/task";
import Task from "./Task";

const TaskList = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [sortBy, setSortby] = useState<string>("created_at");
  const [order, setOrder] = useState<string>("desc");
  const [page, setPage] = useState<number>(0);
  const { data, isFetched } = useGetTasksQuery({
    page: page + 1,
    keyword,
    sortBy,
    order,
  });

  const handlePageChange = (e: PaginatorPageChangeEvent) => {
    setPage(e.page);
  };

  return (
    <div>
      <h2 className="text-center p-0 m-0">Task List</h2>
      <div className="overflow-scroll surface-overlay m-3 h-30rem">
        {isFetched ? (
          data?.tasks.map((task: ITask) => <Task key={task.id} data={task} />)
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
      <Paginator
        first={page * 100}
        rows={data?.limit}
        totalRecords={data?.total}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TaskList;

/**
 * todo:
 * TaskList
 * - search
 * - sort
 *
 * Task
 * - create
 * - edit
 * - delete
 */
