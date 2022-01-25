import { User } from '../../domain/models/user'

export interface LoadUserByEmailRepository {
  loadByEmail: (params: LoadUserByEmailRepository.Params) => Promise<LoadUserByEmailRepository.Result>
}

export namespace LoadUserByEmailRepository {
  export type Params = {
    email: string
  }

  export type Result = User | undefined
}
