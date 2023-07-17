import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Team } from '../teams/team.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { description: `Coach FootballApi ID`, nullable: true })
  @Column({ nullable: true })
  oldId?: number

  @Field(() => String, { description: 'Coachs name', nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field(() => String, { description: 'Coachs date of birth', nullable: true })
  @Column({ nullable: true })
  dateOfBirth?: string;

  @Field(() => String, { description: 'Coachs nationality', nullable: true })
  @Column({ nullable: true })
  nationality?: string;

  @Field(() => Team, { nullable: true, description: 'Coachs team', })
  @OneToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team?: Team;

}
