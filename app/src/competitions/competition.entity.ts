import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Competition {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  areaName: string;

  // @ManyToMany(() => Team, (team) => team.competitions)
  // @JoinTable({
  //   name: 'competition_team',
  //   joinColumn: {
  //     name: 'competition_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'team_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // teams?: Team[];
  
}
