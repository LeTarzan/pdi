import { notFound, ok, serverError } from './../../helpers/http'
import { UserNotFoundError } from '../../errors/user-not-found'
import { LoadUserByEmail } from '../../../domain/features/load-user-by-email'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller } from '../../protocols/controller'
import { logError, logInfo } from '../../../infra/logger'

export class LoadUserByEmailController implements Controller {
  constructor (
    private readonly loadUserByEmail: LoadUserByEmail
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.loadUserByEmail.perform({ email: httpRequest.params.email })

      if (!user) {
        logInfo(`User not found at ${this.constructor.name}`)
        return notFound(new UserNotFoundError())
      }

      return ok(user)
    } catch (error) {
      logError(error)
      return serverError(error as Error)
    }
  }
}
