import { APIError } from "./api-error";
import { APISuccess } from "./api-success";
import { LocalAppError } from "./local-error";

export type MutationErr = LocalAppError | APIError;
