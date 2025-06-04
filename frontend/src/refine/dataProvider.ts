import { DataProvider } from "@refinedev/core";
import axiosInstance from "./axiosInstance";

const GRAPHQL_URL = "http://127.0.0.1:8000/graphql";
const API_URL = "http://127.0.0.1:8000/api";

function graphqlRequest(query: string, variables?: any) {
  return axiosInstance.post(GRAPHQL_URL, {
    query,
    variables,
  });
}

export const dataProviderGraphql: DataProvider = {
  getList: async ({ resource }) => {
    const query = `
      query GetTodos($userId: Int!) {
        getTodos(userId: $userId) {
          id
          userId
          title
          description
          dueDate
          isCompleted
          createdAt
          updatedAt
        }
      }
    `;
    const response = await graphqlRequest(query, { userId: 4 });
    return {
      data: response.data.data.getTodos,
      total: response.data.data.getTodos.length,
    };
  },

  getOne: async ({ resource, id }) => {
    const query = `
      query GetTodo($id: Int!) {
        getTodo(id: $id) {
          id
          userId
          title
          description
          dueDate
          isCompleted
          createdAt
          updatedAt
        }
      }
    `;
    const response = await graphqlRequest(query, { id: Number(id) });
    return {
      data: response.data.data.getTodo,
    };
  },

  create: async ({ resource, variables }) => {
    const query = `
      mutation CreateTodo($title: String!, $description: String, $due_date: DateTime) {
        createTodo(userId: 1, title: $title, description: $description, dueDate: $due_date) {
          id
          title
          description
          dueDate
          isCompleted
          createdAt
          updatedAt
        }
      }
    `;
    const response = await graphqlRequest(query, variables);
    return {
      data: response.data.data.createTodo,
    };
  },

  update: async ({ resource, id, variables }) => {
    // 只支持 graph_todos，实际调用 update_todo mutation
    const query = `
      mutation UpdateTodo($id: Int!, $title: String, $description: String, $isCompleted: Boolean) {
        updateTodo(id: $id, title: $title, description: $description, isCompleted: $isCompleted) {
          id
          userId
          title
          description
          dueDate
          isCompleted
          createdAt
          updatedAt
        }
      }
    `;
    const response = await graphqlRequest(query, { id: Number(id), ...variables });
    return {
      data: response.data.data.updateTodo,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const query = `
      mutation DeleteTodo($id: Int!) {
        deleteTodo(id: $id)
      }
    `;
    const response = await graphqlRequest(query, { id: Number(id) });
    return {
      data: { id } as any,
    };
  },

  getApiUrl: () => GRAPHQL_URL,
};

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    // 目前后端不支持分页/过滤/排序，直接获取全部
    const response = await axiosInstance.get(`${API_URL}/${resource}`);
    return {
      data: response.data,
      total: response.data.length,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const response = await axiosInstance.get(`${API_URL}/${resource}/${id}`);
    return {
      data: response.data,
    };
  },

  create: async ({ resource, variables, meta }) => {
    const response = await axiosInstance.post(`${API_URL}/${resource}`, variables);
    return {
      data: response.data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const response = await axiosInstance.put(`${API_URL}/${resource}/${id}`, variables);
    return {
      data: response.data,
    };
  },

  deleteOne: async ({ resource, id, meta }) => {
    // 后端返回 204，无内容，Refine 需要返回被删除对象的 id
    return {
      data: { id } as any,
    };
  },

  getApiUrl: () => API_URL,
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
