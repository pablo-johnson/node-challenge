import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachesModule } from '../coaches/coaches.module';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), CoachesModule, PlayersModule],
  providers: [TeamsService],
  exports: [TeamsService]
})
export class TeamsModule { }
