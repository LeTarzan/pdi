import { mock, MockProxy } from 'jest-mock-extended'

import { LoadUserByEmail } from '../../../src/domain/features/load-user-by-email'
import { LoadUserByEmailRepository } from '../contracts/load-user-by-email-repository'
import { DbLoadUserByEmail } from './../../../src/data/services/load-user-by-email'

describe('DbLoadUserByEmail usecase', () => {
  let sut: LoadUserByEmail
  let userRepository: MockProxy<LoadUserByEmailRepository>
  const email = {
    email: 'any_email@mail.com'
  }

  beforeAll(() => {
    userRepository = mock<LoadUserByEmailRepository>()
    userRepository.loadByEmail.mockResolvedValue({
      id: 1,
      name: 'any_name',
      email: 'any_email@mail.com'
    })
  })

  beforeEach(() => {
    sut = new DbLoadUserByEmail(userRepository)
  })

  it('should call loadByEmail with correct params', async () => {
    await sut.perform(email)

    expect(userRepository.loadByEmail).toHaveBeenCalledTimes(1)
    expect(userRepository.loadByEmail).toHaveBeenCalledWith(email)
  })

  it('should return an user on success', async () => {
    const expected = await sut.perform(email)

    expect(expected).toStrictEqual({
      id: 1,
      name: 'any_name',
      email: email.email
    })
  })

  it('should return undefined when user nonexist', async () => {
    userRepository.loadByEmail.mockResolvedValue(undefined)

    const expected = await sut.perform(email)

    expect(expected).toBeUndefined()
  })

  it('should throws if loadByEmail throw', async () => {
    userRepository.loadByEmail.mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.perform(email)

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
