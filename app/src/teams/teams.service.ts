import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dtos/create-team.dto';
import { Competition } from 'src/competitions/competition.entity';
import { PlayersService } from '../players/players.service';
import { CoachesService } from '../coaches/coaches.service';

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

}
