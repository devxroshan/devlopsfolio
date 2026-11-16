import { useMutation } from "@tanstack/react-query";

import { APISuccess } from "@/app/types/api-success";
import { MutationErr } from "@/app/types/mutation-err";
import { OnMutation } from "@/app/types/on-mutation";
import { CreateRoleSchema } from "../role-api/schema/create-role.schema";
import { AddRoleAPI, DeleteRoleAPI } from "../role-api/api";
import { DeleteRoleSchema } from "../role-api/schema/delete-role.schema";

export const useAddRoleMutation: OnMutation<
  APISuccess,
  MutationErr,
  CreateRoleSchema
> = (onSuccess, onError) => {
  return useMutation<APISuccess, MutationErr, CreateRoleSchema>({
    mutationFn: AddRoleAPI,
    onSuccess: (data) => onSuccess?.(data),
    onError: (err) => onError?.(err),
  });
};

export const useDeleteRoleMutation: OnMutation<
  APISuccess,
  MutationErr,
  DeleteRoleSchema
> = (onSuccess, onError) => {
  return useMutation<APISuccess, MutationErr, DeleteRoleSchema>({
    mutationFn: DeleteRoleAPI,
    onSuccess: (data) => onSuccess?.(data),
    onError: (err) => onError?.(err),
  });
};
