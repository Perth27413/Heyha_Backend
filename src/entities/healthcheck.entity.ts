import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Healthcheck {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  message: string
}