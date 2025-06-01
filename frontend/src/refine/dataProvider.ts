import { DataProvider } from "@refinedev/core";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    // 目前后端不支持分页/过滤/排序，直接获取全部
    const response = await axios.get(`${API_URL}/${resource}`);
    return {
      data: response.data,
      total: response.data.length,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const response = await axios.get(`${API_URL}/${resource}/${id}`);
    return {
      data: response.data,
    };
  },

  create: async ({ resource, variables, meta }) => {
    const response = await axios.post(`${API_URL}/${resource}`, variables);
    return {
      data: response.data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const response = await axios.put(`${API_URL}/${resource}/${id}`, variables);
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

  // 其余可选方法可后续添加，如 getMany, createMany 等
};
