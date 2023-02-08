/* eslint-disable import/first */
import 'reflect-metadata'
import * as dotenv from 'dotenv'
dotenv.config()
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('@instana/collector')()

import { env } from './config/env'
import { PgConnection } from './../infra/postgres/helpers'
import { logError } from '../infra/logger'

PgConnection.getConnection()
  .then(async () => {
    const { app } = await import('./config/app')
    app.listen(env.app.PORT, () => console.log(`Server is running on port ${env.app.PORT}`))
  })
  .catch(console.error)

process.on('uncaughtException', (error) => {
  logError(error)
})

process.on('unhandledRejection', (error) => {
  logError(error)
})
