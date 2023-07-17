import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { FootballDataModule } from '../football-data/football-data.module';
import { Competition } from './competition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [FootballDataModule, TypeOrmModule.forFeature([Competition])],
  providers: [CompetitionsService],
  exports: [CompetitionsService]
})
export class CompetitionsModule {}
