import { ChangeEvent, useState } from "react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useDebounce } from "@uidotdev/usehooks";
import { useGetTasksQuery } from "../api/task";
import { ITask } from "../types/task";
import Task from "./Task";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

const ORDER_BY = ["asc", "desc"];
const SORT_BY = [
  { label: "Created at", code: "created_at" },
  { label: "Due Date", code: "due_date" },
];

const TaskList = () => {
  const [keyword, setKeyword] = useState<string>("");
  const debouncedSearch = useDebounce(keyword, 1000); // prevent overwhelming requests
  const [sortBy, setSortby] = useState<string>("created_at");
  const [order, setOrder] = useState<string>("desc");
  const [page, setPage] = useState<number>(0);
  const { data, isFetched } = useGetTasksQuery({
    page: page + 1,
    keyword: debouncedSearch,
    sortBy,
    order,
  });

  const handlePageChange = (e: PaginatorPageChangeEvent) => {
    setPage(e.page);
  };

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSortByChange = (e: DropdownChangeEvent) => {
    console.log(e.target.value)
    setSortby(e.target.value);
  };

  const handleOrderChange = (e: DropdownChangeEvent) => {
    setOrder(e.target.value);
  };

  return (
    <div>
      <h2 className="text-center p-0 m-0">Task List</h2>
      <div className="px-3">
        <InputText
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Search task name"
        />
        <Dropdown
          value={sortBy}
          onChange={handleSortByChange}
          options={SORT_BY}
          optionLabel="label"
          optionValue="code"
          placeholder="Sort By"
          className="ml-2"
        />
        <Dropdown
          value={order}
          onChange={handleOrderChange}
          options={ORDER_BY}
          placeholder="Order"
          className="ml-2"
        />
      </div>
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
