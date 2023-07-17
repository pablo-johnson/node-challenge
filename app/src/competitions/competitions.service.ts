import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CompetitionTeamsResponse } from '../football-data/data.interface';
import { FootballDataService } from '../football-data/football-data.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competition } from './competition.entity';
import { TeamsService } from '../teams/teams.service';
import { PlayersService } from '../players/players.service';
import { Player } from '../players/player.entity';


@Injectable()
export class CompetitionsService {
  private readonly logger = new Logger('Competition Service');

  constructor(
    private readonly footballDataService: FootballDataService,
    @InjectRepository(Competition)
    private competitionRepository: Repository<Competition>,
    private teamService: TeamsService,
    private playerService: PlayersService,) { }

  async fetchLeagueWithTeamsAndPlayers(leagueName: string) {
    this.logger.log("fetchLeagueWithTeamsAndPlayers called");
    const competition = await this
      .footballDataService.getLeague(leagueName);


    const { teams, competition: competitionInfo }: CompetitionTeamsResponse = await this
      .footballDataService.getLeagueTeams(leagueName);

    const competitionDto = { ...competitionInfo, areaName: competition.area.name };
    const savedCompetition = await this.competitionRepository.save(competitionDto);
    await this.teamService.saveTeams(teams, savedCompetition);
    return { success: true };
  }

  async getPlayersFromTeamsInLeague(leagueCode: string, teamName: string): Promise<Player[]> {
    var filter: any;
    if (teamName) {
      filter = { code: leagueCode, teams: { name: teamName } };
    } else {
      filter = { code: leagueCode };
    }
    const league: Competition = await this.competitionRepository.findOne({
      where: filter,
      relations: ['teams'],
    })
    if (!league) {
      throw new HttpException(`LEAGUE ${leagueCode} NOT FOUND`, HttpStatus.NOT_FOUND);
    }
    const teamIds = league.teams.map(team => { return team.id });
    const players: Player[] = await this.playerService.getPlayersByTeamIds(teamIds);
    return players;
  }


}
