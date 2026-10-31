import { api } from "../lib/api";
import { APISuccess } from "../types/api-success";

export const GetMeAPI = async () => {
  return await api.get<APISuccess, APISuccess>("/user/me");
};
