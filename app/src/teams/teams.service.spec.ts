import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamsService } from './teams.service';
import { PlayersService } from '../players/players.service';
import { Team } from './team.entity';
import { CoachesService } from '../coaches/coaches.service';

describe('TeamsService', () => {
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamsService,
        {
          provide: PlayersService,
          useFactory: () => ({
            savePlayers: jest.fn(),
          }),
        },
        {
          provide: getRepositoryToken(Team),
          useClass: Repository,
        },
        {
          provide: CoachesService,
          useFactory: () => ({
            saveCouch: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
