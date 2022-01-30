import { notFound, ok, serverError } from './../../helpers/http';
import { UserNotFoundError } from '../../errors/user-not-found';
import { LoadUserByEmail } from '../../../domain/features/load-user-by-email';
import { HttpResponse } from '../../protocols/http';

type HttpRequest = {
  email: string
}

export class LoadUserByEmailController {
  constructor (
    private readonly loadUserByEmail: LoadUserByEmail
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.loadUserByEmail.perform({ email: httpRequest.email })

      if(!user) {
        return notFound(new UserNotFoundError())
      }

      return ok(user)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
