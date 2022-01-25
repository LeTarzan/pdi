import { UserNotFoundError } from '../../domain/errors'
import { LoadUserByEmail } from '../../domain/features/load-user-by-email'
import { LoadUserByEmailRepository } from '../contracts/load-user-by-email-repository'

export class DbLoadUserByEmail implements LoadUserByEmail {
  constructor (
    private readonly userRepository: LoadUserByEmailRepository
  ) {}

  async perform (params: LoadUserByEmail.Params): Promise<LoadUserByEmail.Result> {
    const user = await this.userRepository.loadByEmail(params)
    if (user != null) {
      return user
    }
    return new UserNotFoundError()
  }
}
