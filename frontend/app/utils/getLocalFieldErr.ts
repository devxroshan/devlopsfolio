import { LocalAppError } from "../types/local-error";

export const getLocalFieldErr = (
  fieldName: string,
  err: LocalAppError,
): string => {
  if (!err) return "";

  return (
    err.fieldErrors?.filter((err) => err.fieldName === fieldName)[0]?.msg ?? ""
  );
};
