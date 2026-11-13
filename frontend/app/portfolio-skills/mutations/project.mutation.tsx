import { useMutation } from "@tanstack/react-query";
import { MutationErr } from "@/app/types/mutation-err";
import { APISuccess } from "@/app/types/api-success";

import { DeleteProjectSchema } from "../project-api/schema/delete-project.schema";
import { AddProjectSchema } from "../project-api/schema/add-project.schema";

import { AddProjectAPI } from "../project-api/api";
import { DeleteProjectAPI } from "../project-api/api";
import { OnMutation } from "@/app/types/on-mutation";

export const useAddProjectMutation: OnMutation<
  APISuccess,
  MutationErr,
  AddProjectSchema
> = (onSuccess, onError) => {
  return useMutation<APISuccess, MutationErr, AddProjectSchema>({
    mutationFn: AddProjectAPI,
    onSuccess: (data) => onSuccess?.(data),
    onError: (err) => onError?.(err),
  });
};

export const useDeleteProjectMutation: OnMutation<
  APISuccess,
  MutationErr,
  DeleteProjectSchema
> = (onSuccess, onError) => {
  return useMutation<APISuccess, MutationErr, DeleteProjectSchema>({
    mutationFn: DeleteProjectAPI,
    onSuccess: (data) => onSuccess?.(data),
    onError: (err) => onError?.(err),
  });
};
