import { RedisRepository } from './../../../src/infra/redis'
import { PgConnection } from './../../../src/infra/postgres/helpers/connection'
import request from 'supertest'
import { app } from '../../../src/main/config/app'
import { Knex } from 'knex'

jest.mock('knex')
jest.mock('./../../../src/infra/redis')

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

const MOCK_USER = {
  id: 1,
  name: 'valid_name',
  email: 'valid_email@mail.com'
}

const EXPECTED_RESULT = {
  id: 1,
  name: 'valid_name',
  email: 'valid_email@mail.com'
}

describe('GET /user/load-by-email/:email', () => {
  beforeEach(async () => {
    mockSet.mockReset()
    mockGet.mockReset()
    mockWhere.mockReset()
  })

  it('should return 404 on load', async () => {
    const { status } = await request(app)
      .get('/user/load-by-email/any_email@mail.com')

    expect(status).toBe(404)
  })

  it.each([
    [null, MOCK_USER, EXPECTED_RESULT],
    [MOCK_USER, null, EXPECTED_RESULT],
    [MOCK_USER, MOCK_USER, EXPECTED_RESULT]
  ])(
    'should return 200, when cache is %o, db is %o',
    async (cacheResult, dbResult, expectedResult) => {
      mockWhere.mockResolvedValue([dbResult])
      mockGet.mockResolvedValueOnce(cacheResult)

      const { status, body } = await request(app)
        .get('/user/load-by-email/valid_email@mail.com')

      expect(status).toBe(200)
      expect(body).toStrictEqual(expectedResult)
    })
})
