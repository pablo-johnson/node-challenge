import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { FootballDataModule } from '../football-data/football-data.module';
import { Competition } from './competition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [FootballDataModule, TypeOrmModule.forFeature([Competition]), TeamsModule],
  providers: [CompetitionsService],
  exports: [CompetitionsService]
})
export class CompetitionsModule {}
