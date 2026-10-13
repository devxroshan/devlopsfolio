import type {
  IAuthenticatedDeveloperProfile,
  IAuthenticatedUser,
} from "../interfaces/authenticated.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IAuthenticatedUser;
    }
  }
}
