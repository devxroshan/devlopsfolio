export interface IException {
  ok: boolean;
  msg: string;
  path: string;
  timestamp: string;
  code: string;
  details: any;
  statusCode?: number;
  rawError: any;
}
