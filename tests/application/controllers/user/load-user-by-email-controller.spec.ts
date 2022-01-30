import { notFound, ok, serverError } from '../../../../src/application/helpers/http';
import { LoadUserByEmailController } from '../../../../src/application/controllers/user'
import { MockProxy, mock } from 'jest-mock-extended'
import { UserNotFoundError } from '../../../../src/application/errors/user-not-found'
import { LoadUserByEmail } from '../../../domain/features/load-user-by-email'

const email = {
  email: 'any_email@mail.com'
}

const USER = {
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com'
}

describe('LoadUserByEmailController', () => {
  let sut: LoadUserByEmailController
  let loadUserByEmail: MockProxy<LoadUserByEmail>

  beforeEach(() => {
    loadUserByEmail = mock<LoadUserByEmail>()
    loadUserByEmail.perform.mockResolvedValue(USER)

    sut = new LoadUserByEmailController(loadUserByEmail)
  })

  it('should LoadUserByEmail with correct params', async () => {
    await sut.handle(email)

    expect(loadUserByEmail.perform).toHaveBeenCalledWith(email)
    expect(loadUserByEmail.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 404 if loadUserByEmail returns undefined', async () => {
    loadUserByEmail.perform.mockResolvedValueOnce(undefined)

    const result = await sut.handle(email)

    expect(result).toStrictEqual(notFound(new UserNotFoundError()))
  })

  it('should return 200 if loadUserByEmail returns an unser', async () => {
    const result = await sut.handle(email)

    expect(result).toStrictEqual(ok(USER))
  })

  it('should return 500 if loadUserByEmail throws', async () => {
    loadUserByEmail.perform.mockRejectedValueOnce(new Error('any_error'))

    const result = await sut.handle(email)

    expect(result).toStrictEqual(serverError(new Error('any_error')))
  })
})
