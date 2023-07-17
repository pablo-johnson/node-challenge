import { Test, TestingModule } from '@nestjs/testing';
import { CoachesService } from './coaches.service';
import { In, Repository } from 'typeorm';
import { Coach } from './coach.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockedCoachInputData, mockedTeam } from '../../test/mock-data';

describe('CoachesService', () => {
  let service: CoachesService;
  let coachRepository: Repository<Coach>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoachesService,
        {
          provide: getRepositoryToken(Coach),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CoachesService>(CoachesService);
    coachRepository = module.get<Repository<Coach>>(getRepositoryToken(Coach));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveCoach', () => {
    it("should save the given createDtoCoach and return the saved coach", async () => {
      jest
        .spyOn(coachRepository, 'save')
        .mockImplementation(
          jest.fn(() => Promise.resolve({ ...mockedCoachInputData, team: mockedTeam, id: 1 })),
        );

      const result = await service.saveCoach(mockedCoachInputData);

      expect(coachRepository.save).toBeCalledTimes(1);
      expect(result).toEqual({ ...mockedCoachInputData, team: mockedTeam, id: 1 })
    })
  })
});
