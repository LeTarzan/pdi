import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PgUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  email!: string
}
