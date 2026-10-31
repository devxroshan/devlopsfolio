import { api } from "../lib/api";
import { APISuccess } from "../types/api-success";
import { schemaValidator } from "../utils/schema-validator";
import { AddSkillInfo, addSkillSchema } from "./schema/add-skill.schema";
import {
  deleteSkillSchema,
  DeleteSkillSchema,
} from "./schema/delete-skill.schema";

export const AddSkillAPI = async (data: AddSkillInfo) => {
  await schemaValidator(addSkillSchema, data);
  return await api.post<APISuccess, APISuccess, AddSkillInfo>("/skill", data);
};

export const GetAllSkillAPI = async () => {
  return await api.get<APISuccess, APISuccess>("/skill");
};

export const DeleteSkillAPI = async (data: DeleteSkillSchema) => {
  await schemaValidator(deleteSkillSchema, data);
  return await api.delete<APISuccess, APISuccess, DeleteSkillSchema>(
    `/skill?skill_id=${data.skill_id}`,
  );
};
