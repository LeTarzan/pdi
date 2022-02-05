import { LoadUserByEmailController } from '../../../application/controllers/user'
import { Controller } from '../../../application/protocols/controller'
import { makeDbLoadUserByEmailService } from '../services/load-user-by-email'

export const makeLoadUserByEmailController = (): Controller => {
  return new LoadUserByEmailController(makeDbLoadUserByEmailService())
}
