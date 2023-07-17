import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Competition } from './competition.entity';
import { CompetitionsService } from './competitions.service';
import { Team } from '../teams/team.entity';
import { TeamsResolver } from '../teams/teams.resolver';
import { ImportResponse } from './import-response.entity';
import { UseGuards } from '@nestjs/common';
import { GqlThrottlerGuard } from '../utils/gql-throttler.guard';

@Resolver(of => Competition)
export class CompetitionsResolver {

  constructor(
    private readonly competitionsService: CompetitionsService,
    private teamsResolver: TeamsResolver,
  ) { }


  @UseGuards(GqlThrottlerGuard)
  @Mutation(() => ImportResponse)
  importLeague(@Args('leagueCode', { type: () => String }) leagueCode: string) {
    return this.competitionsService.fetchLeagueWithTeamsAndPlayers(leagueCode);
  }

  @ResolveField(() => [Team])
  teams(@Parent() competition: Competition) {
    return this.teamsResolver.teamsFromCompetition(competition.id);
  }
}
