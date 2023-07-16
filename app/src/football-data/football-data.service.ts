import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Competition, CompetitionTeamsResponse } from './data.interface';

@Injectable()
export class FootballDataService {

  constructor(private readonly httpService: HttpService) { }

  async fetch<T>(endpoint: string): Promise<T> {
    // HttpService 'get' method returns an observable. Here we use the function
    // 'lastValueFrom' to convert the observable to a promise
    // https://docs.nestjs.com/techniques/http-module#full-example
    const { data: response } = await lastValueFrom(
      this.httpService.get<T>(endpoint),
    );
    return response;
  }

  async getLeague(leagueName: string): Promise<Competition> {
    return this.fetch<Competition>(`competitions/${leagueName}`);
  }

  async getLeagueTeams(leagueName: string): Promise<CompetitionTeamsResponse> {
    return this.fetch<CompetitionTeamsResponse>(`competitions/${leagueName}/teams`);
  }

}
