import type { DataProvider } from "@refinedev/core";

import axios, { AxiosError } from "axios";

import { API_URL } from "../constant";
import { TOKEN_KEY } from "./authProvider";

interface ErrorResponse {
  message: string;
}

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id, meta }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const response = await axios.get(`${API_URL}/api/${resource}/show/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });
    const data = response.data.data;
    return { data };
  },
  update: async ({ resource, id, variables }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log("re", resource);
    const response = await axios.patch(
      `${API_URL}/api/${resource}/edit/${id}`,
      variables,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    if (response.status < 200 || response.status > 299) throw response;
    const data = response.data.data;
    return { data };
  },
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log("re", resource);
    const response = await axios.get(`${API_URL}/api/${resource}/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;
    const data = await response.data.data;
    return {
      data,
      total: data.length,
    };
  },
  create: async ({ resource, variables }) => {
    console.log("re", resource);
    const token = localStorage.getItem(TOKEN_KEY);
    try {
      const response = await axios.post(
        `${API_URL}/api/${resource}/create`,
        variables,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      if (response.status < 200 || response.status > 299) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
      const data = await response.data.data;
      return { data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError<ErrorResponse>;
        if (response) {
          const errorMessages =
            response.data.message.split(",")[0] || "An error occurred";
          throw new Error(`${errorMessages}`);
        } else {
          throw new Error("Network or server error occurred");
        }
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  },
  deleteOne: async ({ resource, id }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    try {

      // http://localhost:4000/api/admin_users/delete/3
      const response = await axios.delete(
        `${API_URL}/api/${resource}/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const data = response.data.data;
      return { data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError<ErrorResponse>;
        if (response) {
          const errorMessages = response?.data.message || "An Error Occured !";
          throw new Error(`${errorMessages}`);
        } else {
          throw new Error("An Network error Occured !");
        }
      } else {
        throw new Error("An unknown error occured");
      }
    }
  },
  getApiUrl: function (): string {
    return API_URL;
  },
};
