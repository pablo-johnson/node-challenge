import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamsService } from './teams.service';
import { PlayersService } from '../players/players.service';
import { Team } from './team.entity';
import { CoachesService } from '../coaches/coaches.service';
import { mockedCompetition, mockedTeam, mockedTeamCreateDto } from '../../test/mock-data';

describe('TeamsService', () => {
  let service: TeamsService;
  let playersService: PlayersService;
  let coachesService: CoachesService;
  let teamsRepository: Repository<Team>;

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
            saveCoach: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    playersService = module.get<PlayersService>(PlayersService);
    coachesService = module.get<CoachesService>(CoachesService);
    teamsRepository = module.get<Repository<Team>>(
      getRepositoryToken(Team),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveTeam', () => {
    it("should save the given teamCreateDto, players and coach and return the saved team", async () => {
      jest.spyOn(teamsRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(teamsRepository, 'create').mockReturnValueOnce(mockedTeam);
      jest
        .spyOn(teamsRepository, 'save')
        .mockResolvedValueOnce({ ...mockedTeam, competitions: [mockedCompetition] });

      const result = await service.saveTeam(mockedTeamCreateDto, mockedCompetition);

      expect(teamsRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockedTeamCreateDto.id },
        relations: ['competitions'],
      });
      expect(teamsRepository.create).toHaveBeenNthCalledWith(1, mockedTeamCreateDto);
      expect(teamsRepository.save).toHaveBeenNthCalledWith(1, { ...mockedTeam, competitions: [mockedCompetition] });
      expect(result).toEqual({ ...mockedTeam, competitions: [mockedCompetition] })
      expect(playersService.savePlayers).toHaveBeenNthCalledWith(1, mockedTeam.players, mockedTeam);
    })

    it("should add a competition to an already created team", async () => {
      const newCompetition = { ...mockedCompetition, id: 20, name: "Nueva compt" }

      jest.spyOn(teamsRepository, 'findOne').mockResolvedValueOnce(mockedTeam);
      jest.spyOn(teamsRepository, 'create').mockReturnValueOnce(mockedTeam);
      jest
        .spyOn(teamsRepository, 'save')
        .mockResolvedValueOnce({ ...mockedTeam, competitions: [newCompetition] });
      const result = await service.saveTeam(mockedTeamCreateDto, newCompetition);

      expect(teamsRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockedTeamCreateDto.id },
        relations: ['competitions'],
      });
      expect(teamsRepository.create).toBeCalledTimes(0);
      expect(teamsRepository.save).toHaveBeenNthCalledWith(1, { ...mockedTeam, competitions: [mockedCompetition, newCompetition] });
      expect(result).toEqual({ ...mockedTeam, competitions: [newCompetition] })
      expect(playersService.savePlayers).toBeCalledTimes(0);
    })
  })

  describe('saveTeams', () => {
    it("should save the given teamCreateDtos, players and coach and return the saved teams", async () => {
      const teamsToInsert = [mockedTeamCreateDto, { ...mockedTeamCreateDto, id: 10 }];
      const resultTeams = [mockedTeam, { ...mockedTeam, id: 10, name: "Cristal" }]

      jest.spyOn(teamsRepository, 'findOne').mockReturnValueOnce(null)
        .mockReturnValueOnce(null);
      jest.spyOn(teamsRepository, 'create').mockReturnValueOnce(resultTeams[0])
        .mockReturnValueOnce(resultTeams[1]);
      jest
        .spyOn(teamsRepository, 'save')
        .mockResolvedValueOnce(resultTeams[0])
        .mockResolvedValueOnce(resultTeams[1]);
      jest.spyOn(service, 'saveTeam').mockImplementationOnce(
        jest.fn(() => Promise.resolve(resultTeams[0])),
      ).mockImplementationOnce(
        jest.fn(() => Promise.resolve(resultTeams[1])),
      );

      const result = await service.saveTeams(teamsToInsert, mockedCompetition);
      expect(service.saveTeam).toBeCalledTimes(resultTeams.length);
      expect(result).toEqual(resultTeams)

    })
  })
});
