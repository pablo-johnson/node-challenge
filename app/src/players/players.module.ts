import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Player]),],
  providers: [PlayersService],
  exports: [PlayersService]
})
export class PlayersModule { }
