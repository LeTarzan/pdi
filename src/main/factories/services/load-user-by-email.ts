import { DbLoadUserByEmail } from "../../../data/services/load-user-by-email";
import { LoadUserByEmail } from "../../../domain/features/load-user-by-email";
import { makePgUserRepository } from "../repositories/user";

export const makeDbLoadUserByEmailService = (): DbLoadUserByEmail => {
  return new DbLoadUserByEmail(makePgUserRepository())
}
