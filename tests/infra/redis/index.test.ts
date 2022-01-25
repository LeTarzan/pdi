import { RedisRepository } from '../../../src/infra/redis/index'

describe('RedisRepository', () => {
  let sut: RedisRepository

  const params = {
    key: 'any_key',
    value: 'any_value'
  }

  beforeEach(() => {
    sut = new RedisRepository()
  })

  it('should create and get', async () => {
    await sut.set(params)

    const result = await sut.get({ key: params.key })

    expect(result).toBe('any_value')
  })

  it('should return null if key not exists', async () => {
    const result = await sut.get({ key: 'nonexistent_key' })

    expect(result).toBeNull()
  })
})
