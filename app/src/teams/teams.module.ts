import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachesModule } from '../coaches/coaches.module';
import { PlayersModule } from '../players/players.module';
import { TeamsResolver } from './teams.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), CoachesModule, PlayersModule],
  providers: [TeamsService, TeamsResolver],
  exports: [TeamsService, TeamsResolver]
})
export class TeamsModule { }
