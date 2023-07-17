import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { Team } from '../teams/team.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Player {
  @Field(() => Int, { description: `Player Id`, nullable: true })
  @PrimaryColumn()
  id: number;

  @Field(() => String, { description: `Player name`, nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field(() => String, { description: `Player dateOfBirth`, nullable: true })
  @Column({ nullable: true })
  dateOfBirth: string;

  @Field(() => String, { description: `Player position`, nullable: true })
  @Column({ nullable: true })
  position: string;

  @Field(() => String, { description: `Player nationality`, nullable: true })
  @Column({ nullable: true })
  nationality: string;

  @Field(() => Team, { description: `Player team`, nullable: true })
  @ManyToOne(() => Team, (team) => team.players, { nullable: true })
  @JoinColumn({ name: 'team_id' })
  team?: Relation<Team>;

}
