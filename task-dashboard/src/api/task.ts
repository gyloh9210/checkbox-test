import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ITask } from "../types/task";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000,
});

type GetTasksResponse = {
  tasks: ITask[];
  limit: number;
  total: number;
  page: number;
};

type DeleteTaskResponse = {
  message: string;
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
  return useQuery<GetTasksResponse>({
    queryKey: [
      "tasks",
      {
        page,
        keyword,
        sortBy,
        order,
      },
    ],
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

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteTaskResponse, unknown, string>({
    mutationFn: async (id: string) => {
      const { data } = await instance.delete(`/tasks/${id}`);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
