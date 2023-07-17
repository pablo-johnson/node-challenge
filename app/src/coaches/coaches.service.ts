import { Injectable, Logger } from '@nestjs/common';
import { Coach } from './coach.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCoachDto } from './dtos/create-coach.dto';

@Injectable()
export class CoachesService {

  private readonly logger = new Logger('CoachesService');

  constructor(
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
  ) { }

  async saveCoach(createCoachDto: CreateCoachDto): Promise<Coach> {
    this.logger.log("saveCoach called");
    const createdCoach: Coach = await this.coachRepository.save(createCoachDto);
    return createdCoach;
  }

  async getCoachByTeamIds(teamIds: number[]): Promise<Coach[]> {
    return await this.coachRepository.find({
      where: {
        team: { id: In(teamIds) }
      }
    });
  }
}
