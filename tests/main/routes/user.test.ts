import { PgConnection } from './../../../src/infra/postgres/helpers/connection';
import { Repository, getConnection, getRepository } from 'typeorm';
import { PgUser } from './../../../src/infra/postgres/entities/user';
import request from 'supertest'
import { app } from '../../../src/main/config/app'
import { makeFakeDb } from '../../infra/postgres/config'
import { IBackup } from 'pg-mem';

describe('GET /user/load-by-email/:email', () => {
  let backup: IBackup
  let connection: PgConnection
  let pgUserRepo: Repository<PgUser>

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = connection.getRepository(PgUser)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(() => {
    backup.restore()
  })

  it('should return 404 on load', () => {
    request(app)
    .get('/user/load-by-email/any_email@mail.com')
    .expect(404)
  })

  it('should return 200 on load', async () => {
    pgUserRepo.save({
      name: 'valid_name',
      email: 'valid_email@mail.com',
    })

    const { status, body } = await request(app)
    .get('/user/load-by-email/valid_email@mail.com')

    expect(status).toBe(200)
    expect(body).toEqual({
      id: 1,
      name: 'valid_name',
      email: 'valid_email@mail.com'
    })
  })
})
