import 'reflect-metadata'

import { env } from './config/env'
import { PgConnection } from './../infra/postgres/helpers'

PgConnection.getInstance().connect()
  .then(async () => {
    const { app } = await import('./config/app')
    app.listen(env.app.port, () => console.log(`Server is running on port ${env.app.port}`))
  })
  .catch(console.error)
