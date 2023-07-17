import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { Player } from './player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoachesService } from '../coaches/coaches.service';

describe('PlayersService', () => {
  let service: PlayersService;
  let coachesService: CoachesService;
  let playersRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
        {
          provide: CoachesService,
          useFactory: () => ({
            saveCoach: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    coachesService = module.get<CoachesService>(CoachesService);
    playersRepository = module.get<Repository<Player>>(
      getRepositoryToken(Player),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
