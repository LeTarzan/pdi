import { Knex } from 'knex'
import { RedisRepository } from './../../../src/infra/redis/index'
import { PgUserRepository } from './../../../src/infra/postgres/repositories/user'
import { PgConnection } from './../../../src/infra/postgres/helpers/'

jest.mock('knex')
jest.mock('./../../../src/infra/redis/index')

const mockSet = jest.fn()
const mockGet = jest.fn()
RedisRepository.prototype.get = mockGet
RedisRepository.prototype.set = mockSet

const mockWhere = jest.fn()

const QUERY_BUILDER = {
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  where: mockWhere
}

jest.spyOn(PgConnection, 'getConnection').mockResolvedValue(QUERY_BUILDER as unknown as Knex)

const VALID_EMAIL = 'valid_email@mail.com'

const EXPECTED_RESULT = {
  id: 1,
  name: 'valid_name',
  email: VALID_EMAIL
}

describe('PgUserRepository', () => {
  describe('loadByEmail', () => {
    let sut: PgUserRepository

    beforeAll(async () => {
      sut = new PgUserRepository()
    })

    beforeEach(async () => {
      mockWhere.mockReset()
      mockGet.mockReset()
    })

    it.each([
      [VALID_EMAIL, null, 1, EXPECTED_RESULT],
      [VALID_EMAIL, EXPECTED_RESULT, 0, EXPECTED_RESULT]
    ])(
      'when email is %s and the cache is %o, should returns %o',
      async (email, cacheResult, setCacheTimesCalled, expectedResult) => {
        mockWhere.mockResolvedValue([expectedResult])
        mockGet.mockResolvedValueOnce(cacheResult)

        const user = await sut.loadByEmail({ email })

        expect(user).toStrictEqual(expectedResult)
        expect(mockSet).toHaveBeenCalledTimes(setCacheTimesCalled)
      })

    it('should return undefined user\'s email not exists', async () => {
      const user = await sut.loadByEmail({ email: VALID_EMAIL })

      expect(user).toBeUndefined()
    })
  })
})
