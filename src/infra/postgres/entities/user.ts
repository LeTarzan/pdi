import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class PgUser {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id!: number

  @Column(
    {
      length: 100
    }
  )
  name!: string

  @Column(
    {
      length: 100
    }
  )
  email!: string
}
