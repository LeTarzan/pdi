import { PgUserRepository } from '../../../infra/postgres/repositories/user'

export const makePgUserRepository = (): PgUserRepository => {
  return new PgUserRepository()
}
