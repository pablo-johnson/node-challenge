import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { Team } from '../teams/team.entity';

@Entity()
export class Player {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  nationality: string;

  @ManyToOne(() => Team, (team) => team.players, { nullable: true })
  @JoinColumn({ name: 'team_id' })
  team?: Relation<Team>;

}
