import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Team } from '../teams/team.entity';
import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Competition {
  @Field(() => Int, { description: `Competition Id`, nullable: true })
  @PrimaryColumn()
  id: number;

  @Field(() => String, { description: `Competition name`, nullable: true })
  @Column()
  name: string;

  @Field(() => String, { description: `Competition code`, nullable: true })
  @Column()
  code: string;

  @Field(() => String, { description: `Competition areaName`, nullable: true })
  @Column()
  areaName: string;

  @Field(() => [Team], { description: `Competition name`, nullable: true })
  @ManyToMany(() => Team, (team) => team.competitions)
  @JoinTable({
    name: 'competition_team',
    joinColumn: {
      name: 'competition_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
  })
  teams?: Team[];

}
