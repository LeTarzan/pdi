import {
  Connection,
  createConnection,
  getConnection,
  getRepository,
  getConnectionManager, ObjectType, Repository
} from 'typeorm'

export class PgConnection {
  private static instance: PgConnection
  private connection?: Connection

  static getInstance (): PgConnection {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!PgConnection.instance) PgConnection.instance = new PgConnection()
    return PgConnection.instance
  }

  async connect (): Promise<void> {
    this.connection =
    getConnectionManager().has('default')
    ? getConnection()
    : await createConnection()
  }

  async disconnect (): Promise<void> {
    if (this.connection != null) {
      await getConnection().close()
      this.connection = undefined
    }
  }

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    return getRepository(entity)
  }
}
