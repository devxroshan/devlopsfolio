import { api } from "../../lib/api";
import {
  createRoleSchema,
  CreateRoleSchema,
} from "./schema/create-role.schema";
import { schemaValidator } from "../../utils/schema-validator";
import { APISuccess } from "@/app/types/api-success";
import { DeleteRoleSchema } from "./schema/delete-role.schema";

export const AddRoleAPI = async (data: CreateRoleSchema) => {
  await schemaValidator(createRoleSchema, data);
  return await api.post<APISuccess, APISuccess, CreateRoleSchema>(
    "/worked-in-company",
    data,
  );
};

export const GetAllRolesAPI = async () => {
  return await api.get<APISuccess, APISuccess>("/worked-in-company/all");
};

export const DeleteRoleAPI = async (data: DeleteRoleSchema) => {
  return await api.delete<APISuccess, APISuccess, DeleteRoleSchema>(
    `/worked-in-company?worked_in_company_id=${data.worked_in_company_id}`,
  );
};
