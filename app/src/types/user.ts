import * as t from 'io-ts'

export const UserValidator = t.type({
  name: t.string
})

export type User = t.TypeOf<typeof UserValidator>;