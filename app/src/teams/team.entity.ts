import { Entity, Column, PrimaryColumn, JoinColumn, ManyToMany, OneToMany, Relation } from 'typeorm';
import { Competition } from '../competitions/competition.entity';
import { Player } from '../players/player.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Team {

  @Field(() => Int, { description: `Team Id`, nullable: true })
  @PrimaryColumn()
  id: number;

  @Field(() => String, { description: 'Team name', nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field(() => String, { description: 'Team tla', nullable: true })
  @Column({ nullable: true })
  tla: string;

  @Field(() => String, { description: 'Team shortname', nullable: true })
  @Column({ nullable: true })
  shortName: string;

  @Field(() => String, { description: 'Team areaName', nullable: true })
  @Column({ nullable: true })
  areaName: string;

  @Field(() => String, { description: 'Team address', nullable: true })
  @Column({ nullable: true })
  address: string;

  @Field(() => [Player], { description: 'Team players', nullable: 'itemsAndList' })
  @OneToMany(() => Player, (player) => player.team)
  @JoinColumn({ name: 'team_id' })
  players?: Player[];

  @Field(() => [Competition], { description: 'Team competitions', nullable: true })
  @ManyToMany(() => Competition, (competition) => competition.teams)
  competitions?: Competition[];

}
