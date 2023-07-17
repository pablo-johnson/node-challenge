import { Test, TestingModule } from '@nestjs/testing';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';
import { mockedPlayer, mockedTeam } from '../../test/mock-data';
import { Team } from './team.entity';
import { Player } from '../players/player.entity';

describe('TeamsResolver', () => {
  let resolver: TeamsResolver;
  let teamsService: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsResolver,
        {
          provide: TeamsService,
          useFactory: () => ({
            getTeamsByLeagueId: jest.fn(),
            getByName: jest.fn(),
            getPlayersOrCoachByTeamIds: jest.fn(),
          }),
        },
      ],
    }).compile();

    resolver = module.get<TeamsResolver>(TeamsResolver);
    teamsService = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getTeam', () => {
    it('should retrieve a team from the DB with the given teamName', async () => {
      const teamName = 'Arsenal FC';
      const expectedTeam: Team = { ...mockedTeam, name: teamName };

      jest
        .spyOn(teamsService, 'getByName')
        .mockResolvedValueOnce(expectedTeam);

      const result = await resolver.getTeam(teamName);

      expect(teamsService.getByName).toHaveBeenCalledWith(teamName);
      expect(result).toEqual(expectedTeam);
    });

    it('should return no data when asking for a team that does not exist', async () => {
      const teamName = 'No Team ';
      const expectedTeam: Team = null;

      jest
        .spyOn(teamsService, 'getByName')
        .mockResolvedValueOnce(expectedTeam);

      const result = await resolver.getTeam(teamName);

      expect(teamsService.getByName).toHaveBeenCalledWith(teamName);
      expect(result).toEqual(expectedTeam);
    });
  });

  describe('players', () => {
    it('should retrieve all players from the team using the parent team id', async () => {
      const expectedPlayers: Player[] = [mockedPlayer, mockedPlayer];

      jest
        .spyOn(teamsService, 'getPlayersOrCoachByTeamIds')
        .mockResolvedValueOnce(expectedPlayers);

      const result = await resolver.players(mockedTeam);

      expect(teamsService.getPlayersOrCoachByTeamIds).toHaveBeenCalledWith([mockedTeam.id]);
      expect(result).toEqual(expectedPlayers);
    });
  });

  describe('teamsFromCompetition', () => {
    it('should retrieve all teams from the competition parent team is in', async () => {
      const expectedTeams: Team[] = [mockedTeam, mockedTeam, mockedTeam];
      const leagueId = 1;

      jest
        .spyOn(teamsService, 'getTeamsByLeagueId')
        .mockResolvedValueOnce(expectedTeams);

      const result = await resolver.teamsFromCompetition(leagueId);

      expect(teamsService.getTeamsByLeagueId).toHaveBeenCalledWith(leagueId);
      expect(result).toEqual(expectedTeams);
    });
  });
});
