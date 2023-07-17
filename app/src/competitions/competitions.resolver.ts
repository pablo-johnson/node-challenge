import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Competition } from './competition.entity';
import { CompetitionsService } from './competitions.service';
import { Team } from '../teams/team.entity';
import { TeamsResolver } from '../teams/teams.resolver';
import { ImportResponse } from './import-response.entity';

@Resolver(of => Competition)
export class CompetitionsResolver {

  constructor(
    private readonly competitionsService: CompetitionsService,
    private teamsResolver: TeamsResolver,
  ) { }

  @Mutation(() => ImportResponse)
  importLeague(@Args('leagueCode', { type: () => String }) leagueCode: string) {
    return this.competitionsService.fetchLeagueWithTeamsAndPlayers(leagueCode);
  }

  @ResolveField(() => [Team])
  teams(@Parent() competition: Competition) {
    return this.teamsResolver.teamsFromCompetition(competition.id);
  }
}
