import type { IAuthenticated } from "../interfaces/authenticated.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IAuthenticated;
    }
  }
}
