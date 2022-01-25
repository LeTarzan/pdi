export interface RedisRepositoy {
  get: <T>(params: RedisGet.Params) => Promise<T>
  set: (params: RedisSet.Params) => Promise<RedisSet.Result>
}

export namespace RedisGet {
  export type Params = {
    key: string
  }
}

export namespace RedisSet {
  export type Params = {
    key: string
    value: any
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  export type Result = void
}
