import axios, { AxiosError } from "axios";
import { APISuccess } from "../types/api-success";
import { APIError } from "../types/api-error";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => {
    const body = res.data;
    const success: APISuccess = {
      ok: true,
      msg: body?.msg ?? body?.message ?? "Success",
      data: body?.data ?? body,
    };
    return success as any;
  },

  (err: AxiosError<any>) => {
    const body = err.response?.data;

    const apiError: APIError = {
      ok: false,
      msg:
        body?.msg ??
        body?.message ??
        (err.code === "ECONNABORTED"
          ? "Request timed out. Please try again."
          : !err.response
            ? "Network error. Check your connection."
            : "Something went wrong."),
      path: body?.path ?? err.config?.url ?? "",
      code: body?.code ?? "INTERNAL_SERVER_ERROR",
      timestamp: body?.timestamp ?? new Date().toISOString(),
      details: body?.details ?? body?.errors ?? null,
      statusCode: err.response?.status,
      rawError: err,
    };

    return Promise.reject(apiError);
  },
);
