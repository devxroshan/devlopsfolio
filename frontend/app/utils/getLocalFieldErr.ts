import { FieldError, LocalAppError } from "../types/local-error";

export const getLocalFieldErr = (
  fieldName: string,
  err: LocalAppError,
): FieldError | undefined => {
  if (!err) return undefined;

  return err.fieldErrors?.find((err) => err.fieldName === fieldName);
};
