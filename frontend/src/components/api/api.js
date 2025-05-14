import Cookies from "js-cookie";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const LoginUser = async (email, password) => {
  try {
    const response = await api.post("/signin", { email, password });
    Cookies.set("token", response.data.token, {
      expires: 1,
    });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error); // 🔍 Log full error
    console.error("Error Response:", error.response); // 🔍 Log server response
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const SignUpUser = async (name, email, password) => {
  try {
    const response = await api.post("/signup", { name, email, password });
    Cookies.set("token", response.data.token, {
      expires: 1,
    });
    return response.data;
  } catch (error) {
    console.error("Sign Up Error:", error); // 🔍 Log full error
    console.error("Error Response:", error.response); // 🔍 Log server response
    throw new Error(error.response?.data?.message || "Sign Up failed");
  }
};

export const LogOutUser = async () => {
  try {
    const response = await api.post("/signout");
    Cookies.remove("token");
    return response.data;
  } catch (error) {
    console.error("Log Out Error:", error); // 🔍 Log full error
    console.error("Error Response:", error.response); // 🔍 Log server response
    throw new Error(error.response?.data?.message || "Log Out failed");
  }
}