import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Coach {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  nationality: string;

}
