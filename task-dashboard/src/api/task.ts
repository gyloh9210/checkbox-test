import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ITask } from "../types/task";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000,
});

type TaskResponse = {
  tasks: ITask[];
  limit: number;
  total: number;
  page: number;
};

type GetTasksParam = {
  page: number;
  keyword: string;
  sortBy: string;
  order: string;
};

export const useGetTasksQuery = ({
  page,
  keyword,
  sortBy,
  order,
}: GetTasksParam) => {
  return useQuery<TaskResponse>({
    queryKey: ["tasks", {
      page,
      keyword,
      sortBy,
      order,
    }],
    queryFn: async () => {
      const { data } = await instance.get("/tasks", {
        params: {
          page,
          keyword,
          sortBy,
          order,
        },
      });
      return data;
    },
  });
};
