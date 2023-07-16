import { Module } from '@nestjs/common';
import { FootballDataService } from './football-data.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({
    baseURL: process.env.FOOTBALL_API_URL,
    headers: {
      'X-Auth-Token': process.env.FOOTBALL_API_TOKEN
    }
  })],
  providers: [FootballDataService],
  exports: [FootballDataService]
})
export class FootballDataModule { }
