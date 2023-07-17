import { Entity, Column, PrimaryColumn, JoinColumn, ManyToMany, OneToMany, Relation } from 'typeorm';
import { Competition } from '../competitions/competition.entity';
import { Player } from '../players/player.entity';

@Entity()
export class Team {

  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  tla: string;

  @Column({ nullable: true })
  shortName: string;

  @Column({ nullable: true })
  areaName: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => Player, (player) => player.team)
  @JoinColumn({ name: 'team_id' })
  players?: Player[];

  @ManyToMany(() => Competition, (competition) => competition.teams)
  competitions?: Competition[];

}
