import axios from "axios";

export const instance = axios.create({
  baseURL: "/api/users",
});

export const signup = async (userData) => {
  return await instance.post("/signup", userData);
};

export const login = async (userData) => {
  return await instance.post("/login", userData);
};


