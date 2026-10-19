export type APIError = {
  ok: false;
  msg: string;
  path: string;
  timestamp: string;
  code: string
  details: any;
  statusCode?: number;
  rawError: any;
}
