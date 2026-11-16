import { useMutation } from "@tanstack/react-query";

import { APISuccess } from "@/app/types/api-success";
import { MutationErr } from "@/app/types/mutation-err";
import { OnMutation } from "@/app/types/on-mutation";
import { AddSkillSchema } from "../skill-api/schema/add-skill.schema";

import { AddSkillAPI, DeleteSkillAPI } from "../skill-api/api";
import { DeleteSkillSchema } from "../skill-api/schema/delete-skill.schema";

export const useAddSkillMutation: OnMutation<
  APISuccess,
  MutationErr,
  AddSkillSchema
> = (onSuccess, onError) => {
  return useMutation<APISuccess, MutationErr, AddSkillSchema>({
    mutationFn: AddSkillAPI,
    onSuccess: (data) => onSuccess?.(data),
    onError: (err) => onError?.(err),
  });
};

export const useDeleteSkillMutation: OnMutation<
  APISuccess,
  MutationErr,
  DeleteSkillSchema
> = (onSuccess, onError) => {
  return useMutation<APISuccess, MutationErr, DeleteSkillSchema>({
    mutationFn: DeleteSkillAPI,
    onSuccess: (data) => onSuccess?.(data),
    onError: (err) => onError?.(err),
  });
};
