import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                username,
                password,
            }),
        });
        if (!response.ok) throw new Error("Login failed");
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data));
        return {
            success: true,
        }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: new Error("Invalid credentials"),
      };
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return {
      success: true,
    };
  },

  check: async () => {
    const token = localStorage.getItem("token");
    if (!token) return { authenticated: false, error: new Error("Unauthorized") };
    return { authenticated: true };
  },

  onError: async (error) => ({}),

  getIdentity: async () => {
    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    }
    return null;
  },
};