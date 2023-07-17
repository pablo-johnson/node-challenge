import { Team } from '../teams/team.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  oldId?: number

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  dateOfBirth?: string;

  @Column({ nullable: true })
  nationality?: string;

  @OneToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team?: Team;

}
