import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionsResolver } from './competitions.resolver';
import { TeamsResolver } from '../teams/teams.resolver';
import { CompetitionsService } from './competitions.service';
import { ThrottlerModule } from '@nestjs/throttler';

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
        .mockResolvedValueOnce();

      const result = await resolver.importLeague(leagueCode);

      expect(competitionsService.fetchLeagueWithTeamsAndPlayers).toHaveBeenCalledWith(leagueCode);
      expect(result).toEqual(undefined);
    });
  });
});
