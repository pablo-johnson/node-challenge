import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dtos/create-team.dto';
import { Competition } from 'src/competitions/competition.entity';
import { PlayersService } from '../players/players.service';
import { CoachesService } from '../coaches/coaches.service';
import { Player } from 'src/players/player.entity';
import { Coach } from 'src/coaches/coach.entity';

@Injectable()
export class TeamsService {

  private readonly logger = new Logger('TeamsService');

  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    private coachesService: CoachesService,
    private playersService: PlayersService,
  ) { }

  async saveTeam(createTeamDto: CreateTeamDto, competition: Competition): Promise<Team> {
    this.logger.log("saveTeam called");

    const teamInDb = await this.teamRepository.findOne({
      where: { id: createTeamDto.id },
      relations: ["competitions"]
    })

    let savedTeam: Team;
    if (teamInDb) {
      if (!teamInDb.competitions.find(teamCompetition => teamCompetition.id == competition.id)) {
        teamInDb.competitions.push(competition);
        savedTeam = await this.teamRepository.save(teamInDb);
      }
    } else {
      savedTeam = this.teamRepository.create(createTeamDto);
      savedTeam.competitions = [competition];
      savedTeam = await this.teamRepository.save(savedTeam);

      const coachDto = { ...createTeamDto.coach, team: savedTeam, oldId: createTeamDto.id };
      await this.coachesService.saveCoach(coachDto);

      await this.playersService.savePlayers(createTeamDto.squad, savedTeam);
    }

    return savedTeam;
  }

  async saveTeams(createTeamDtos: CreateTeamDto[], competition: Competition): Promise<Team[]> {
    this.logger.log("saveTeams called");

    const savedTeams: Team[] = await Promise.all(createTeamDtos.map(teamDto => {
      return this.saveTeam(
        { ...teamDto, areaName: teamDto.area.name },
        competition,
      );
    }));

    this.logger.log(`${createTeamDtos.length} teams from ${competition.name} successfyle saved`);

    return savedTeams;
  }
  async getByName(teamName: string): Promise<Team> {
    this.logger.log(`findByName: looking for team ${teamName}`)
    const team: Team = await this.teamRepository.findOne({
      where: {
        name: Like(`%${teamName}%`)
      },
      relations: {
        players: true,
        competitions: true,
      },
    });
    return team;
  }

  async getPlayersOrCoachByTeamIds(teamIds: number[]): Promise<Player[] | Coach[]> {
    this.logger.log(`getPlayersOrCoachByTeamIds`);
    const players: Player[] = await this.playersService.getPlayersByTeamIds(teamIds);
    if (players != null && players.length > 0) {
      this.logger.log("found players")
      return players;
    }
    this.logger.log("No players found");
    const coaches: Coach[] = await this.coachesService.getCoachByTeamIds(teamIds);
    return coaches;
  }

  async getTeamsByLeagueId(leagueId: number): Promise<Team[]> {
    this.logger.log(`getTeamsByLeagueId: leagueId: ${leagueId}`);
    return this.teamRepository.createQueryBuilder('team')
      .innerJoin('team.competitions', 'competitions')
      .where('competitions.id = :leagueId', { leagueId })
      .getMany();
  }

}
