import type { AuthProvider } from "@refinedev/core";
import axios from "axios";
import { CHECK_API, GET_CURRENT_USER, LOGIN } from "../constant";

export const TOKEN_KEY = "refine-auth";
export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const user_name = email.split("@")[0];
      const response = await axios.post(`${LOGIN}`, {
        user_name,
        password,
      });

      const { token, role, user_id, ...user } = response.data;
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem("role", role);
        localStorage.setItem("id", user_id);
        localStorage.setItem("roleFit", "true");
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid username or password",
        },
      };
    } catch (error) {
      console.log("error", error);
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid username or password",
        },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("role");
    localStorage.removeItem("roleFit");
    localStorage.removeItem("id");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    // try {
    //   const response = await axios.get(CHECK_API, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (response.status >= 200 && response.status < 299) {
    //     return {
    //       authenticated: true,
    //     };
    //   }
    // } catch (error) {
    //   console.error("Check API error:", error);
    //   return {
    //     authenticated: false,
    //     redirectTo: "/login",
    //   };
    // }

    if(token){
      return {
        authenticated: true,
      };
    }
    

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const id = localStorage.getItem("id");
    const response = await axios.get(`${GET_CURRENT_USER}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data) {
      return {
        id: 1,
        name: `${response?.data?.data?.full_name}`,
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
