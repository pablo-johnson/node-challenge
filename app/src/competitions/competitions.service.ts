import { Injectable, Logger } from '@nestjs/common';
import { CompetitionTeamsResponse } from '../football-data/data.interface';
import { FootballDataService } from '../football-data/football-data.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competition } from './competition.entity';
import { TeamsService } from '../teams/teams.service';


@Injectable()
export class CompetitionsService {
  private readonly logger = new Logger('Competition Service');

  constructor(
    private readonly footballDataService: FootballDataService,
    @InjectRepository(Competition)
    private competitionRepository: Repository<Competition>,
    private teamService: TeamsService,) { }

  async fetchLeagueWithTeamsAndPlayers(leagueName: string) {

    const competition = await this
      .footballDataService.getLeague(leagueName);


    const { teams, competition: competitionInfo }: CompetitionTeamsResponse = await this
      .footballDataService.getLeagueTeams(leagueName);

    const competitionDto = { ...competitionInfo, areaName: competition.area.name };
    const savedCompetition = await this.competitionRepository.save(competitionDto);
    await this.teamService.saveTeams(teams, savedCompetition);
    


  }


}
