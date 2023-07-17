import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionsService } from './competitions.service';
import { TeamsService } from '../teams/teams.service';
import { Competition } from './competition.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FootballDataService } from '../football-data/football-data.service';
import { mockedArea, mockedCompetition, mockedPlayer, mockedTeam } from '../../test/mock-data';
import { PlayersService } from '../players/players.service';

describe('CompetitionsService', () => {
  let service: CompetitionsService;
  let footballDataService: FootballDataService;
  let competitionsRepository: Repository<Competition>;
  let teamsService: TeamsService;
  let playersService: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompetitionsService,
        {
          provide: getRepositoryToken(Competition),
          useClass: Repository,
        },
        {
          provide: TeamsService,
          useFactory: () => ({
            saveTeams: jest.fn(),
          }),
        },
        {
          provide: PlayersService,
          useFactory: () => ({
            savePlayers: jest.fn(),
            getPlayersByTeamIds: jest.fn(),
          }),
        },
        {
          provide: FootballDataService,
          useFactory: () => ({
            getLeague: jest.fn(() =>
              Promise.resolve({ ...mockedCompetition, area: mockedArea }),
            ),
            getLeagueTeams: jest.fn(() =>
              Promise.resolve({
                teams: [mockedTeam, { ...mockedTeam, id: 5 }, { ...mockedTeam, id: 6 }],
                competition: mockedCompetition,
              }),
            ),
          }),
        },
      ],
    }).compile();

    service = module.get<CompetitionsService>(CompetitionsService);
    footballDataService = module.get<FootballDataService>(FootballDataService);
    competitionsRepository = module.get<Repository<Competition>>(
      getRepositoryToken(Competition),
    );
    teamsService = module.get<TeamsService>(TeamsService);
    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchLeagueWithTeamsAndPlayers', () => {
    it('should import a league with teams and players', async () => {
      const leagueCode: string = "PL";
      const mockedTeams = [mockedTeam, { ...mockedTeam, id: 5 }, { ...mockedTeam, id: 6 }];
      const competitionCreateDto = {
        ...mockedCompetition,
        areaName: mockedCompetition.area.name
      }
      jest
        .spyOn(competitionsRepository, 'save')
        .mockResolvedValueOnce(mockedCompetition);
      jest
        .spyOn(teamsService, 'saveTeams')
        .mockResolvedValueOnce(Promise.resolve(mockedTeams));

      await service.fetchLeagueWithTeamsAndPlayers(leagueCode);
      expect(footballDataService.getLeague).toHaveBeenCalledWith(leagueCode);
      expect(footballDataService.getLeagueTeams).toHaveBeenCalledWith(
        leagueCode,
      );
      expect(competitionsRepository.save).toHaveBeenCalledWith(competitionCreateDto);
      expect(teamsService.saveTeams).toHaveBeenCalledWith(
        mockedTeams,
        mockedCompetition,
      );
    })
  });

  describe('getPlayersFromTeamsInLeague', () => {
    it('should retrieve all players from specified league', async () => {
      const leagueCode: string = mockedCompetition.code;
      const teams = [mockedTeam, mockedTeam, mockedTeam];
      const players = [mockedPlayer, mockedPlayer, mockedPlayer]

      jest
        .spyOn(competitionsRepository, 'findOne')
        .mockResolvedValueOnce({ ...mockedCompetition, teams: teams });

      jest
        .spyOn(playersService, 'getPlayersByTeamIds')
        .mockResolvedValueOnce(players);

      const result = await service.getPlayersFromTeamsInLeague(leagueCode, undefined);


      expect(competitionsRepository.findOne).toHaveBeenCalledWith({
        where: { code: leagueCode },
        relations: ['teams'],
      });
      expect(playersService.getPlayersByTeamIds).toHaveBeenCalledWith([1, 1, 1]);
      expect(result).toEqual(players);
    })
  });
});
