import { Test, TestingModule } from '@nestjs/testing';
import { FootballDataService } from './football-data.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { mockedCompetition, mockedCompetitionTeams } from '../../test/mock-data';

describe('FootballDataService', () => {
  let service: FootballDataService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FootballDataService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of({})),
          },
        },],
    }).compile();

    service = module.get<FootballDataService>(FootballDataService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetch', () => {
    it('should make a get htttp call to the given url with the correct headers and the correct response data',
      async () => {
        const mockedResponse = {
        };
        const url = process.env.FOOTBALL_API_URL;

        const getSpy = jest
          .spyOn(httpService, 'get')
          .mockImplementation(jest.fn(() => of(mockedResponse)) as any);

        await service['fetch'](url);

        expect(getSpy).toHaveBeenCalledWith(url);
        expect(getSpy).toReturn();
      })
  });

  describe('getLeague', () => {
    it('should make a get call to the get competition endpoint and receive a competition dto',
      async () => {
        const leagueName = 'PL';
        const endpoint = `competitions/${leagueName}`

        const fetchSpy = jest
          .spyOn(service, 'fetch')
          .mockResolvedValue(mockedCompetition);

        const result = await service['getLeague'](leagueName);

        expect(fetchSpy).toHaveBeenCalledWith(endpoint);
        expect(fetchSpy).toReturn();
        expect(result).toEqual(mockedCompetition);
      })
  });

  describe('getLeagueTeams', () => {
    it('should make a get call to the get competition endpoint and receive a competition dto',
      async () => {
        const leagueName = 'PL';
        const endpoint = `competitions/${leagueName}/teams`

        const fetchSpy = jest
          .spyOn(service, 'fetch')
          .mockResolvedValue(mockedCompetitionTeams);

        const result = await service['getLeagueTeams'](leagueName);

        expect(fetchSpy).toHaveBeenCalledWith(endpoint);
        expect(fetchSpy).toReturn();
        expect(result).toEqual(mockedCompetitionTeams);
      })
  });
});
