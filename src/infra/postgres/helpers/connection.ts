import { knex, Knex } from 'knex'
import { env } from '../../../main/config/env'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PgConnection {
  private static connection?: Knex

  static async getConnection (): Promise<Knex> {
    if (!PgConnection.connection) await PgConnection.connect()

    return PgConnection.connection as Knex
  }

  static async connect (): Promise<void> {
    if (!PgConnection.connection) {
      PgConnection.connection = await knex({
        client: 'pg',
        connection: {
          host: env.postgres.host,
          port: env.postgres.port,
          user: env.postgres.user,
          password: env.postgres.password,
          database: env.postgres.database
        }
      })
    }
  }

  static async disconnect (): Promise<void> {
    if (PgConnection.connection != null) {
      await PgConnection.connection.destroy()
      PgConnection.connection = undefined
    }
  }
}
