import { User } from '../models/user'

export interface LoadUserByEmail {
  perform: (params: LoadUserByEmail.Params) => Promise<LoadUserByEmail.Result>
}

export namespace LoadUserByEmail {
  export type Params = {
    email: string
  }

  export type Result = User | undefined
}
