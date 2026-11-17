import { schemaValidator } from "@/app/utils/schema-validator";
import { api } from "../../lib/api";
import {
  addProjectSchema,
  AddProjectSchema,
} from "./schema/add-project.schema";
import { APISuccess } from "@/app/types/api-success";
import {
  deleteProjectSchema,
  DeleteProjectSchema,
} from "./schema/delete-project.schema";

export const AddProjectAPI = async (data: AddProjectSchema) => {
  await schemaValidator(addProjectSchema, data);
  return await api.post<APISuccess, APISuccess, AddProjectSchema>(
    "/dev-project",
    data,
  );
};

export const GetAllProjectAPI = async () => {
  return await api.get<APISuccess, APISuccess>("/dev-project/all");
};

export const DeleteProjectAPI = async (data: DeleteProjectSchema) => {
  await schemaValidator(deleteProjectSchema, data);
  return await api.delete<APISuccess, APISuccess, DeleteProjectSchema>(
    `/dev-project?project_id=${data.project_id}`,
  );
};
