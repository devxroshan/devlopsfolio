import { MutationErr } from "./mutation-err";
import { APISuccess } from "./api-success";
import { UseMutationResult } from "@tanstack/react-query";

export type OnMutation<TSuccess, TError, TData> = (
  onSuccess?: (data: APISuccess) => void,
  onError?: (err: MutationErr) => void,
) => UseMutationResult<TSuccess, TError, TData>;
