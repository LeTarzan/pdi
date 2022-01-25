import { MockProxy, mock } from 'jest-mock-extended'
import { PgUserRepository } from './../../../src/infra/postgres/repositories/user'
import { PgUser } from './../../../src/infra/postgres/entities/user'

import { getConnection, getRepository, Repository } from 'typeorm'
import { IBackup } from 'pg-mem'
import { makeFakeDb } from './config'
import { RedisRepositoy } from '../../data/contracts'

describe('PgUserRepository', () => {
  describe('loadByEmail', () => {
    let sut: PgUserRepository
    let pgUserRepo: Repository<PgUser>
    let backup: IBackup
    let cache: MockProxy<RedisRepositoy>

    const email = {
      email: 'valid_email@mail.com'
    }
    const EXPECTED_RESULT = {
      id: 1,
      name: 'valid_name',
      email: email.email
    }

    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
      pgUserRepo = getRepository(PgUser)
      sut = new PgUserRepository()
      cache = mock<RedisRepositoy>()
    })

    beforeEach(() => {
      backup.restore()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    it.each([
      [email, null, EXPECTED_RESULT],
      [email, EXPECTED_RESULT, EXPECTED_RESULT]
    ])(
      'when email is %s and the cache is %o, should returns %o',
      async (input, cacheResult, expectedResult) => {
        await pgUserRepo.save({
          name: 'valid_name',
          email: email.email
        })
        cache.get.mockResolvedValueOnce(cacheResult)

        const user = await sut.loadByEmail(input)

        expect(user).toStrictEqual(expectedResult)
      })

    it('should return undefined user\'s email not exists', async () => {
      const user = await sut.loadByEmail(email)

      expect(user).toBeUndefined()
    })
  })
})
