import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Team } from './team.entity';
import { TeamsService } from './teams.service';
import { Player } from '../players/player.entity';

@Resolver(of => Team)
export class TeamsResolver {

  constructor(private readonly teamsService: TeamsService) { }

  @Query(() => Team, { name: 'team', nullable: true })
  async getTeam(@Args('teamName', { type: () => String }) teamName: string) {
    return this.teamsService.getByName(teamName);
  }

  @ResolveField(() => [Player], { nullable: true })
  async players(@Parent() team: Team) {
    return await this.teamsService.getPlayersOrCoachByTeamIds([team.id]);
  }

}
