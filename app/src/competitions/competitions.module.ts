import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { FootballDataModule } from '../football-data/football-data.module';
import { Competition } from './competition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from '../teams/teams.module';
import { CompetitionsResolver } from './competitions.resolver';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [FootballDataModule, TypeOrmModule.forFeature([Competition]), TeamsModule, PlayersModule],
  providers: [CompetitionsService, CompetitionsResolver],
  exports: [CompetitionsService]
})
export class CompetitionsModule { }
