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
}

export const useGetTasksQuery = () => {
  return useQuery<TaskResponse>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await instance.get("/tasks");
      return data;
    },
  });
};
