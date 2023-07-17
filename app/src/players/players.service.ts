import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Player } from './player.entity';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Team } from 'src/teams/team.entity';
import { Coach } from 'src/coaches/coach.entity';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger('PlayersService');

  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) { }

  async savePlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    this.logger.log("savePlayer called");
    return this.playerRepository.save(createPlayerDto);
  }

  async savePlayers(createPlayersDtos: CreatePlayerDto[], team: Team): Promise<Player[]> {
    this.logger.log("savePlayers called");

    const savedPlayers: Player[] = await Promise.all(createPlayersDtos.map(playerDto => {
      return this.savePlayer(
        { ...playerDto, team: team }
      );
    }));

    this.logger.log(`${createPlayersDtos.length} teams from ${team.name} successfyle saved`);

    return savedPlayers;
  }
  async getPlayersByTeamIds(teamIds: number[]): Promise<Player[]> {
    this.logger.log(`Get players from teamId: ${teamIds}`);
    const players: Player[] = await this.playerRepository.find({
      where: {
        team: { id: In(teamIds) }
      }
    })
    return players;
  }


}
