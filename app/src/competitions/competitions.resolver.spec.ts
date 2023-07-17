import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionsResolver } from './competitions.resolver';
import { TeamsResolver } from '../teams/teams.resolver';
import { CompetitionsService } from './competitions.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { mockedPlayer } from '../../test/mock-data';

describe('CompetitionsResolver', () => {
  let resolver: CompetitionsResolver;
  let competitionsService: CompetitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot({
          ttl: 60,
          limit: 10,
        }),
      ],
      providers: [
        CompetitionsResolver,
        {
          provide: TeamsResolver,
          useFactory: () => ({
            teamsFromCompetition: jest.fn(),
          }),
        },
        {
          provide: CompetitionsService,
          useFactory: () => ({
            fetchLeagueWithTeamsAndPlayers: jest.fn(),
            getPlayersFromTeamsInLeague: jest.fn(),
          }),
        },
      ],
    }).compile();

    resolver = module.get<CompetitionsResolver>(CompetitionsResolver);
    competitionsService = module.get<CompetitionsService>(CompetitionsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('importLeague', () => {
    it('should call competitionsService.fetchLeagueWithTeamsAndPlayers with the given league leagueCode', async () => {
      const leagueCode = 'PL';

      jest
        .spyOn(competitionsService, 'fetchLeagueWithTeamsAndPlayers')
        .mockResolvedValueOnce({ success: true });

      const result = await resolver.importLeague(leagueCode);

      expect(competitionsService.fetchLeagueWithTeamsAndPlayers).toHaveBeenCalledWith(leagueCode);
      expect(result).toEqual({ success: true });
    });
  });

  describe('getPlayersFromTeamsInLeague', () => {
    it('should call competitionsService.getPlayersFromTeamsInLeague and retrieve all the players from this league', async () => {
      const leagueCode = 'PL';
      const players = [mockedPlayer, mockedPlayer, mockedPlayer]

      jest
        .spyOn(competitionsService, 'getPlayersFromTeamsInLeague')
        .mockResolvedValueOnce(players);

      const result = await resolver.players(leagueCode);

      expect(competitionsService.getPlayersFromTeamsInLeague).toHaveBeenCalledWith(leagueCode, undefined);
      expect(result).toEqual(players);
    });


    it('should call competitionsService.getPlayersFromTeamsInLeague and retrieve all the players from this league and the team specified', async () => {
      const leagueCode = 'PL';
      const teamName = 'Arsenal FC';
      const players = [mockedPlayer, mockedPlayer, mockedPlayer]

      jest
        .spyOn(competitionsService, 'getPlayersFromTeamsInLeague')
        .mockResolvedValueOnce(players);

      const result = await resolver.players(leagueCode, teamName);

      expect(competitionsService.getPlayersFromTeamsInLeague).toHaveBeenCalledWith(leagueCode, teamName);
      expect(result).toEqual(players);
    });
  });
});
