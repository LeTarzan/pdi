import { RedisConnection } from './../../../src/infra/redis/connection'
import { RedisRepository } from '../../../src/infra/redis'

jest.mock('./../../../src/infra/redis/connection')

const mockGet = jest.fn()
const mockSet = jest.fn()

const mockRedis = {
  get: mockGet,
  set: mockSet
}

RedisConnection.getClient = jest.fn().mockReturnValue(mockRedis as never)

const params = {
  key: 'any_key',
  value: 'any_value'
}

describe('RedisRepository', () => {
  let sut: RedisRepository

  beforeEach(() => {
    sut = new RedisRepository()
    mockGet.mockReset()
    mockSet.mockReset()
  })

  it('should get', async () => {
    mockGet.mockResolvedValueOnce('any_value')

    const result = await sut.get({ key: params.key })

    expect(mockGet).toHaveBeenCalledTimes(1)
    expect(mockGet).toHaveBeenCalledWith(params.key)
    expect(result).toBe('any_value')
  })

  it('should set', async () => {
    await sut.set({ key: 'any_key', value: 'any_value' })

    expect(mockSet).toHaveBeenCalledWith(params.key, params.value, 'EX', 3600)
    expect(mockSet).toHaveBeenCalledTimes(1)
  })
})
