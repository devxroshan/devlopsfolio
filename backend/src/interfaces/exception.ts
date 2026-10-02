export interface IException {
  ok: boolean;
  msg: string;
  path: string;
  timestamp: string;
  details?: any;
  statusCode?: number;
}