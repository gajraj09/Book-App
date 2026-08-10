import { config } from "@/config/config";
import axios from "axios";
const api = axios.create({
  baseURL: config.backend_url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data: { email: string; password: string }) => {
  return api.post("/api/user/login", data);
};
export const register = async(data  :{ name:string, email:string, password:string })=>{
   return api.post("/api/user/register",data);
};
export const auth = async (token: string) => {
  return api.get(
    "/api/user/auth",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
