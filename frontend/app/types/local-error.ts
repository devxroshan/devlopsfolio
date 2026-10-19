export type LocalErrorKind = "VALIDATION" | "API" | "NETWORK" | "UNKNOWN";

export type FieldError = { fieldName: string; msg: string; code?: string };

export interface LocalAppError {
  kind: LocalErrorKind;
  msg: string;
  statusCode?: number;
  fieldErrors?: FieldError[];
}
